<?php
namespace App\Http\Controllers;


use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersController extends Controller
{
    private $user;

    public function __construct(){
        $this->user = new User();
    }

    public function index(){
        $users = $this->user->obtener_usuarios_paginados(null);
        return $this->return_response(true, array('data' => $users));
    }

    public function store(Request $request){
        $name           = $request->input('name');
        $email          = $request->input('email');
        $password       = $request->input('password');
        $identificacion = $request->input('identificacion');

        // Validaciones
        if(empty($name)){
            return $this->return_response(false, array('Name empty'));
        }

        if(empty($email)){
            return $this->return_response(false, array('Email empty'));
        }

        if(empty($password)){
            return $this->return_response(false, array('Password empty'));
        }else{
            if(strlen($password) < 4){
                return $this->return_response(false, array('The password must not be less than 4 characters'));
            }
        }

        if(empty($identificacion)){
            return $this->return_response(false, array('ID empty'));
        }else{
            if(!is_numeric($identificacion)){
                return $this->return_response(false, array('ID most be numeric'));
            }
        }

        $r = $this->user->registrar_usuario($name, $email, $password, $identificacion);
        if($r){
            return $this->return_response(true, array('User created'));
        }else{
            return $this->return_response(false, array($r));
        }
    }

    public function put(Request $request){
        $id             = $request->input('id');
        $name           = $request->input('name');
        $email          = $request->input('email');

        // Validaciones
        if(empty($id)){
            return $this->return_response(false, array('ID user empty'));
        }else{
            if(!is_numeric($id)){
                return $this->return_response(false, array('ID user most be numeric'));
            }
        }

        if(empty($name)){
            return $this->return_response(false, array('Name empty'));
        }

        if(empty($email)){
            return $this->return_response(false, array('Email empty'));
        }

        $this->user->actualizar_usuario($name, $email, $id);

        return $this->return_response(true, array('User updated'));
    }

    public function delete($id){
        // Validaciones
        if(empty($id)){
            return $this->return_response(false, array('ID user empty'));
        }else{
            if(!is_numeric($id)){
                return $this->return_response(false, array('ID user most be numeric'));
            }
        }

        $this->user->eliminar_usuario($id);
        return $this->return_response(true, array('User deleted'));
    }

    public function login(Request $request){
        $u = $this->user->whereIdentificacion($request->input('identificacion'))->first();

        if(!is_null($u) && Hash::check($request->input('password'), $u->password)){
            $u->api_token = Str::random(100);
            $u->save();
            return $this->return_response(true, array('token' => $u->api_token, 'Welcome!'));
        }else{
            return $this->return_response(false, array('ID or password invalid'));
        }
        
    }

    public function logout_user(Request $request){
        $token = $request->input('token');
        $this->user->limpiar_token($token);
        return $this->return_response(true, array('Bye!'));
    }

    private function return_response(bool $status, array $mensaje){
        return response()->json([
            'response' => $status,
            'message' => $mensaje
        ]);
    }
}
