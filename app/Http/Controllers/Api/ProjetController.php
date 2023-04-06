<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Tache;
use App\Models\Projet;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ProjetController extends Controller
{

    public function index() {

        $projets = Projet::with('user')->get();

        // $prtantprojet = [];
        $tableaux = [];

        $total = 0;

        foreach($projets as $projet) {

            $valider = 0;

            $taches = Tache::where('projet_id','=', $projet['id'])->get();
            $participant = Projet::find($projet['id'])->users;

            if(count($taches) > 0) {

                foreach($taches as $tache) {

                    if($tache['status_tache'] === "valider") {

                        $valider++;
                    }

                    $total = count($taches);
                }

                $pourcentage = ((int) $valider * 100) / (int) $total;

            } else {

                $pourcentage = 0;
                $total = 0;
            }

            $tableaux[] = [
                'projet' => $projet,
                "pourcentage" => $pourcentage,
                "participant" => $participant
            ];
        }

        return response()->json([
            'status' => 200,
            'projets' => $tableaux,
            // 'taches' => $tableaux
        ]);
    }

    public function store(Request $request) {

        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'owner' => 'required',
            'chef' => 'required',
            'participant' => 'required',
            'debut' => 'required',
            'fin' => 'required',
            'description' => 'required',
        ]);
        if($validation->fails()) {

            return response()->json([
                'error' => $validation->messages(),
                'status' => 422
            ]);

        } else {

            $users = $request->participant;
            $user_id = [];

            foreach($users as $user) {

                $user_id[] = [
                    'user_id' => $user
                ];
            }

            $projet = Projet::create([
                "nom_projet" => $request->name,
                'chef_projet' => $request->owner,
                'user_id' => $request->chef,
                'service_id' => $request->service,
                'date_debut'=> $request->debut,
                'date_fin' => $request->fin,
                'description_projet' => $request->description
            ]);

            $projet->users()->attach($user_id);

            return response()->json([
                'message' => 'success',
                'status' => 200,
            ]);
        }
    }
    public function show($id) {
        //avoir les infos sur un projet,
        $infos = Projet::with('User')->find($id);
        //avoir la liste des users qui travail sur un projet
        $participant = Projet::find($id)->users;
        //avoir le nombre de tache lie a cet projet
        $totaltache = Tache::where('projet_id','=', $id)->get();
        // $totaltache = Tache::find($id)->users;

        if($infos){

            $users = [];
            $totals = 0;
            $valider = 0;
            $pourcentage = 0;


            if($totaltache) {

                foreach($totaltache as $total) {

                    $totaltaches = Tache::find($total['id'])->users;

                    if($total['status_tache'] === "valider") {

                        $valider++;
                    }
                    $users[] = [
                        "totaux" => $totaltaches,
                        'taches' => $total
                    ];
                    $totals++;
                }
                if($totals >= 1) {

                    $pourcentage = ((int) $valider * 100) / (int) $totals;

                } else {

                    $pourcentage = 0;
                }
                if($pourcentage == 100) {

                    $infos->statut_projet = "Terminer";
                    $infos->update();

                } else {

                    // return $infos;
                }
            } else {


            }
            return response()->json([
                'status' => 200,
                'infoprojet' => $infos,
                'participant' => $participant,
                'totaltaches' => $users,
                'pourcentage' => $pourcentage,
            ]);


        } else {
            return response()->json([
                'status' => 404,
                'infoprojet' => 'Cet projet n\'existe pas'
            ]);
        }
    }
}