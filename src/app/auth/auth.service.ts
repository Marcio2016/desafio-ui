import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   jwtPayload: any;

  constructor(
    private http: HttpClient,
    ) { }

  async login(username: string, password: string): Promise<boolean> {

    const result = await this.http.post<any>(`${environment.api}/oauth/token`,
    {client: 'angular', username: username, password:password ,grant_type: 'password'}
    ).toPromise();
    console.log(result)
    if (result && result.token) {
      window.localStorage.setItem('token', result.token);
      return true;
    }

    return false;
  }

  isTokenExpired(token: string){
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  logout(){
    localStorage.removeItem('token');
  }

}

