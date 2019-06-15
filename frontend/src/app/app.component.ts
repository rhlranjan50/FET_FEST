import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'digital-blood-bank';

  constructor(
    private router:Router
  ){  }

  ngOnInit() {
    let userData = localStorage.getItem('digiBloodUser');
    if(userData){
        this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/userRegister']);
    }
  }
}
