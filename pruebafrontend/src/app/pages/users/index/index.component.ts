import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  
  users:users[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private userService:UsersService,
              private router:Router) {
    
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
      }
    };

    this.consultar();

  }

  eliminar(id:any){
    swal('Usuarios', '¿Desea eliminar este usuario?', 'info').then(
      () => {
        this.userService.eliminar_usuario(id).subscribe(
          data =>{
            swal('Usuarios', 'Usuario eliminado', 'success').then(
              () => {
                location.reload();
              }
            );
          },
          err => {
            console.log(err);
          }
        )
      }
    )
  }

  consultar(){
    this.userService.obtener_usuarios().subscribe(
      data => {
        console.log(data);
        this.users.push(...data['message']['data']);
        this.dtTrigger.next();
      },
      err => {
        console.log(err);
        // swal('Login', err.error.message, 'error').then(
        //   () => {
        //     localStorage.clear();
        //     this.router.navigate(['/Login']);
        //   }
        // );
      }
    );
  }

  logout(){
    this.userService.logout().subscribe(
      data => {
        console.log(data);
        localStorage.clear();
        this.router.navigate(['/Login']);
      },
      err => {
        console.log(err);
      }
    )
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
