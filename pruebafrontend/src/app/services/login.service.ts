import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = environment.api_url;

  constructor(private http: HttpClient) { }

  login(datos: login){
    return this.http.post(`${ this.url }/login`, datos);
  }
}
