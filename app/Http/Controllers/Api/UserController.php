<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use App\Models\User;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index() {

        $personnels = User::with('Service')->get();

        $datas = [];

        foreach($personnels as $personnel) {

            $projet_user = User::find($personnel['id'])->projet_teams;
            $valider = 0;

            if($projet_user) {

                foreach($projet_user as $projet) {

                    if($projet['statut_projet'] === "Terminer") {

                        $valider++;
                    }
                }

                $statut = count($projet_user) - (int) $valider;

            } else {

                $statut = 0;
            }


            $datas[] = [
                'personnel' => $personnel,
                'nb_projet' => count($projet_user),
                'status' => $statut,
            ];
        }

        return response()->json([
            'status' => 200,
            'personnel' => $datas,
            // 'datas' => $datas,
        ]);

    }
    public function etrangeres() {

        $role = Role::where('statut_role', 'Afficher')->get();
        $service = Service::where('status_service', "Afficher")->get();

        return response()->json([
            'status' => 200,
            'roles' => $role,
            'services' => $service
        ]);
    }
    public function store(Request $request) {

        $validation = Validator::make($request->all(), [
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required|unique:users,email',
            'service' => 'required',
            'fonction' => 'required',
            'role' => 'required',
            'numero' => 'required',
            'sexe' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg',
            'password' => 'required|min:8',
        ]);

        if($validation->fails()) {

            return response()->json([
                'status' => 422,
                'errors' => $validation->messages(),
            ]);
        } else {

            if($request->hasFile('image')) {

                $file = $request->file("image");
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move(public_path('uploads/profile/'), $filename);
                $image = 'uploads/profile/'.$filename;

            }

            $user = User::create([
                'name' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'role_id' => $request->role,
                'service_id' => $request->service,
                'fonction' => $request->fonction,
                'numero' => $request->numero,
                'photo_profil' => $image,
                'genre' => $request->sexe,
                'password' => Hash::make($request->password)
            ]);

            // $token = $user->createToken($request->email.'_Token')->plainTextToken;

            return response()->json([
                'status' => 200,
                // 'token' => $token,
                'message' => 'Personnel créee avec success'
            ]);

        }
    }
    public function login(Request $request) {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8'
        ]);

        if($validator->fails()) {

            return response()->json([
                'error' => $validator->messages(),
                'status' => 422
            ]);

        } else {

            // $user = User::where('email', $request->email)->with('service')->with('role')->first();

            // if (!$user || !Hash::check($request->password, $user->password)) {

            //     return response()->json([
            //         'message' => 'Vos identifiants sont incorrect',
            //         'status' => 401
            //         ]);

            // } else {

            //     // 1 = admin
            //     if($user->cle == 1) {

            //         $role = "admin";
            //         $token = $user->createToken($request->email.'_AdminToken', ['server:admin'])->plainTextToken;

            //     } else {
            //         $role = "user";
            //         $token = $user->createToken($request->email.'_Token', [''])->plainTextToken;
            //     }

            //     return response()->json([
            //         'status' => 200,
            //         'token' => $token,
            //         'user' => $user,
            //         'message' => 'connexion reussi avec succes'
            //     ]);
            // }
            if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

                $request->session()->regenerate();

                return response()->json([
                    'status' => 200,
                    'user' => Auth::user()->where('email', $request->email)->with('service')->with('role')->get(),
                    'message' => 'connexion reussi avec succes'
                ]);

            } else  {

                return response()->json([
                    'message' => 'Vos identifiants sont incorrect',
                    'status' => 401
                ]);
            }
        }
   }
   public function me() {

        $id_auth = Auth::id();
        $auth = Auth::user()->where('id','=', $id_auth)->with('service')->with('role')->get();

        return response()->json([
            'status' => 200,
            'user' => $auth
        ]);
   }

   public function logout(Request $request) {

    auth('web')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['status' => 200, 'message' => 'logged out']);

   }
}