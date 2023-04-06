<?php

namespace App\Http\Controllers\Api;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\ServiceController;

class ServiceController extends Controller
{
    public function index() {

    }
    public function store(Request $request) {

        $validate = Validator::make($request->all(), [
            'service' => 'required',
            'statut' => 'required',
            'description' => 'required',
        ]);

        if($validate->fails()) {

            return response()->json([
                'error' => $validate->messages(),
                'status' => 422,
                'message' => "Veillez bien renseigner les champs"
            ]);
        }
        $service = Service::create([
            'nom_service' => $request->service,
            'status_service' => $request->statut,
            'description_service' => $request->description,
        ]);

        return response()->json([
            'status' => 200,
            "message" => "Le service a été créé avec success"
        ]);
    }
}