import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   oauthTokenUrl: string;
   jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) {
      this.oauthTokenUrl = `${environment.api}/oauth/token`;
      this.carregarToken();
    }

  async login(username: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpkZXNhZmlv');

    const body = `username=${username}&password=${senha}&grant_type=password`;

   return this.http.post<any>(this.oauthTokenUrl,body,
    { headers, withCredentials:true },

    ).toPromise()
    .then(response => {
      console.log(response);
      this.armazenarToken(response.access_token);
    })
    .catch(response => {
      if (response.status === 400) {
        if (response.error.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
        }
      }

      return Promise.reject(response);
    });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');

    return token;
  }

  isUserLoggedIn() {
    const token = this.carregarToken();
    return true;
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  logout(){
    localStorage.removeItem('token');
  }

}

