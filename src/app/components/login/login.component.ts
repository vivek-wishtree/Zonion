import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/user-info';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  onLogin(): void {
    this.authService.login(this.loginData).subscribe(
      (response) => {
        localStorage.setItem('token', response.accessToken);
        // console.log(response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.router.navigate(['/restaurants']); // Redirect to the restaurant-list page
      },
      (error) => {
        console.log(error);
        // Display appropriate error messages to the user.
      }
    );
  }
  goToSignup(): void {
    this.router.navigate(['/signup']); // Navigate to the signup component
  }

  
}