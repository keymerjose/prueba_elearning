<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'remember_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $table = 'users';

    public function obtener_usuarios_paginados(?int $id){
        if(!empty($id)){
            return User::where('id', '=', $id)->get();
        }else{
            return User::where('id_estatus', '=', '1')->get();
        }
    }

    public function registrar_usuario(string $name, string $email, string $password, int $identificacion){
        $password = Hash::make($password);
        return User::insert([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'identificacion' => $identificacion
        ]);
    }

    public function actualizar_usuario(string $name, string $email, int $id){
        return User::where('id', $id)->update([
            'name' => $name,
            'email' => $email
        ]);
    }

    public function eliminar_usuario(int $id){
        return User::where('id', $id)->update(['id_estatus' => 0]);
    }

    public function limpiar_token($token){
        return User::where('api_token', $token)->update(['api_token' => null]);
    }
}
