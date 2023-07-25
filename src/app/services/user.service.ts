import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.baseApiUrl+ 'api/user/userinfo';
  private accessToken = 'token';
  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<any> {
    const accessToken = localStorage.getItem('token');
    // console.log(accessToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get<UserInfo>(this.apiUrl, { headers });
  }

  logout(): void {
    localStorage.removeItem(this.accessToken);

  }
 

}
