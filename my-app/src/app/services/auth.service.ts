import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  
  login(userData: any) {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
  
  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }
}

