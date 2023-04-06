<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    public function index() {

        $roles = Role::all();
        return response()->json([
            "status" => 200,
            "roles" => $roles
        ]);
    }

    public function store(Request $request) {

        $validation = Validator::make($request->all(), [
            'role' => 'required',
            'status' => 'required',
            'description' => 'required',
        ]);

        if($validation->fails()) {

            return response()->json([
                'error' => $validation->messages(),
                'status' => 422
            ]);
        }
        $role = Role::create([
            'nom_role'=> $request->role,
            "statut_role" => $request->status,
            'description_role' => $request->description
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Success',
        ]);
    }
}