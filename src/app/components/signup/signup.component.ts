import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,private router: Router) { }
  onSignup(): void {
    this.authService.signup(this.signupData).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        // Display appropriate error messages to the user.
      }
    );
  }
}