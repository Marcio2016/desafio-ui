import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { SharedModule } from './../shared/shared.module';
import { environment } from '../../environments/environment';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    SharedModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    JwtHelperService,
    AuthService]
})
export class AuthModule { }
