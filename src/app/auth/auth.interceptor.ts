import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({

        headers: req.headers.set('Authorization', `Bearer ${token}`)
        // setHeaders: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`
        // }
      });
    }

    // retorno o request com o erro tratado
    return next.handle(request)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
    } else {

    }
    return throwError({...error.error, status: error.status});
  }
}
