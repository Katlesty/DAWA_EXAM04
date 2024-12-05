import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerData = {
    username: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router ) 
    { }
  

  ngOnInit(): void {
  }

  register() {
    this.auth.register(this.registerData).subscribe(
      success => {
        console.log('Registration Success');
        
        this.router.navigate(['/login']);
      },
      err => {
        console.error('Registration Error:', err);
      }
    );
  }
}

