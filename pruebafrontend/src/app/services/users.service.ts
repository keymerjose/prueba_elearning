import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { users } from '../interfaces/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  url = environment.api_url;
  token = localStorage.getItem('token');
  
  headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`).set('Accept', 'application/json');  
  constructor(private http: HttpClient) {
    
   }

  obtener_usuarios(){
    return this.http.get<users>(`${this.url}/users/`,{headers: this.headers});
  }

  actualizar_usuario(datos:users){
    return this.http.put(`${this.url}/users/`,datos, {headers: this.headers});
  }

  registrar_usuario(datos:users){
    return this.http.post(`${this.url}/users/`,datos, {headers: this.headers});
  }

  eliminar_usuario(id: string){
    return this.http.delete(`${this.url}/users/${ id }`, {headers: this.headers});
  }

  logout(){
    return this.http.post(`${this.url}/logout`,{token: this.headers});
  }
}
