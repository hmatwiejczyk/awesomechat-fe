import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignup, ILogin } from 'src/app/models/auth.models';

const BASE_URL = 'http://localhost:3000/api/awesomechat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signupUser(body: ISignup): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, body);
  }
  loginUser(body: ILogin): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, body);
  }
}
