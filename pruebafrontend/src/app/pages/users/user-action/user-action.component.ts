import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

import swal from 'sweetalert';
@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {
  data_user:users = {
    id:null,
    name: null,
    email: null,
    created_at:null,
    identificacion: null,
    updated_at: null,
    id_estatus: null,
    api_token: null,
    password: null
  }
  id:string = '';
  password = true;
  accion: string = 'Crear';
  constructor(private route:ActivatedRoute,
              private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id, 'Enmtrooo  ');
    if(this.id !== ''){
      this.accion = 'Modificar';
      this.obtener_datos_usuario(this.id);
    }else{
      this.password = false;
    }
  }

  registrar_cambios(){
    if(this.id !== ''){
      this.actualizar_usuario(this.data_user);
    }else{
      this.registrar_usuario(this.data_user);
    }
    
  }

  obtener_datos_usuario(id){
    this.userService.obtener_usuarios().subscribe(
      data => {
        let a = Array.from(data['message']['data']);
        let datos = a.find(element => element['id'] === parseInt(this.id));
        this.data_user = {
          id: datos['id'],
          name: datos['name'],
          email: datos['email'],
          created_at: null,
          identificacion: datos['identificacion'],
          updated_at: null,
          id_estatus: datos['id_estatus'],
          api_token: null,
          password: null
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  actualizar_usuario(datos: users){
    this.userService.actualizar_usuario(datos).subscribe(
      data =>{
        console.log(data);
        if(data['response']){
          swal('Users', data['message'][0], 'success').then(
            () => {
              this.router.navigate(['/Users'])
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  registrar_usuario(datos: users){
    this.userService.registrar_usuario(datos).subscribe(
      data =>{
        console.log(data);
        if(data['response']){
          swal('Users', data['message'][0], 'success').then(
            () => {
              this.router.navigate(['/Users'])
            }
          );
        }
      },
      err => {
        swal('Users', err['error']['message'], 'error');
        console.log(err);
      }
    )
  }

}
