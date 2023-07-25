import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenApiDto } from '../models/token-api-dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseApiUrl + 'api/user/';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<TokenApiDto> {
    const url = this.apiUrl + 'authenticate';
    return this.http.post<TokenApiDto>(url, credentials);
  }

  signup(userData: any): Observable<any> {
    const url = this.apiUrl + 'register';
    console.log(url);
    return this.http.post<any>(url, userData);
  }

  refreshToken(tokenApiDto: TokenApiDto): Observable<TokenApiDto> {
    const url = this.apiUrl + 'refresh';
    return this.http.post<TokenApiDto>(url, tokenApiDto);
  }

 


}