import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  datos_login:login = {
    identificacion: null,
    password: null
  };
  
  constructor(private loginService: LoginService,
              private appComonent: AppComponent,
              private route: Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token') !== null){
      this.route.navigate(['/Users']);
    }
  }

  login(){
    document.getElementById('btnLogin').classList.add('disabled');
    this.loginService.login(this.datos_login).subscribe(
      data => {
        document.getElementById('btnLogin').classList.remove('disabled');
        console.log(data);
        if(!data['response']){
          swal('Login', data['message'][0], 'error');
        }else{
          localStorage.setItem('token', data['message']['token']);
          this.route.navigate(['/Users']);
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
