import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseApiUrl; // Replace this with the actual base URL of your backend API

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<any> {
    const accessToken = localStorage.getItem('token');
    // console.log(accessToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get<UserInfo>(this.baseUrl+ 'api/user/userinfo', { headers });
  }

  private saveUserInfoToLocal(userDetail: UserInfo) {
    localStorage.setItem('user_detail', JSON.stringify(userDetail));
  }

  getUserInfoFromLocal(): UserInfo | null {
    const userDetailString = localStorage.getItem('user_detail');
    return userDetailString ? JSON.parse(userDetailString) : null;
  }


 
  logout(): Observable<any> {
    console.log(("logout called"));
    
    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    
    console.log(("Token fetched"));

    // console.log(accessToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    console.log(("Upto Return"));

    return this.http.post<any>(this.baseUrl+ 'api/user/logout', { headers });
  }
 

}
