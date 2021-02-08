import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'pruebafrontend';

  constructor(private route:Router){
    if(localStorage.getItem('token') === undefined){
      localStorage.clear();
      this.route.navigate(['/Login']);
      location.reload();
    }
  }

  


}
