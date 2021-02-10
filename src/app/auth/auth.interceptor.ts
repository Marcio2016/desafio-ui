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

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (token) {
      // O request é imutavel, ou seja, não é possível mudar nada
      // Faço o clone para conseguir mudar as propriedades
      // Passo o token de autenticação no header
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
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
      // Erro de client-side ou de rede
     // console.error('Ocorreu um erro:', error.error.message);
    } else {
      // console.error(
      //   `Código do erro ${error.status}, ` +
      //   `Erro: ${JSON.stringify(error.error)}`);
    }
    // retornar um observable com uma mensagem amigavel.
    return throwError({...error.error, status: error.status});
  }
}
