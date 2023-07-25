import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from './models/user-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userDetail : any;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private userService: UserService, private router:Router) {}

  ngOnInit() {
    // Make the API call to fetch user info when the component initializes
    this.userService.getUserInfo().subscribe(
      (userInfo: UserInfo) => {
        // Update the userDetail variable with the fetched user info
        this.userDetail = userInfo;
      },
      (error) => {
        // Handle any errors that might occur during the API call
        this.errorMessage = 'Failed to fetch user information.';
      }
      
    );
    
  }

  logout() {
    // Clear the token from local storage
    this.userService.logout();

    // Clear user details from memory
    this.userDetail = undefined;

    // Navigate to the login page or any other desired page
    this.router.navigate(['/login']);
  }

}