<?php

namespace App\Http\Controllers\Api;

use App\Models\Tache;
use App\Models\Projet;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class TacheController extends Controller
{
    public function index() {

        $tache = Tache::all();

        return response()->json([
            'status' => 200,
            'taches' => $tache,
        ]);
    }
    public function userprojet($id) {

        $users = Projet::find($id)->users;

        return response()->json([
            'status' => 200,
            'users' => $users
        ]);
    }
    public function store(Request $request) {

        $validation = Validator::make($request->all(), [
            'titre' => 'required',
            "debut" => "required",
            "fin" => "required",
            "projet" => "required",
            "scrum" => "required|integer",
            "description" => "required|string",
            "participant" => "required",
        ]);

        if($validation->fails()) {

            return response()->json([
                'error' => $validation->messages(),
                'status' => 422,
            ]);
        }
        $users = $request->participant;
        $user_id = [];

        foreach($users as $user) {

            $user_id[] = [
                'user_id' => $user
            ];
        }

        $tache = Tache::create([
            "titre" => $request->titre,
            'date_debut' => $request->debut,
            'date_fin' => $request->fin,
            'description_tache' => $request->description,
            'user_id' => $request->scrum,
            'projet_id' => $request->projet,
        ]);

        $tache->users()->attach($user_id);

        return response()->json([
            'message' => 'success',
            'status' => 200
        ]);

    }
    public function updatestatut(Request $request, $id) {

        $tache = Tache::find($id);
        $tache->status_tache = $request->status;
        $tache->update();

        return response()->json([
            'status' => 200,
            'message' => "success"
        ]);
    }
}