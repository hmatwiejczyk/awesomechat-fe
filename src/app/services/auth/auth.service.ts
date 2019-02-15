import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserVTO } from 'src/app/models/user.models';

const BASE_URL = 'http://localhost:3000/api/awesomechat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signupUser(body: IUserVTO): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, body);
  }
}
