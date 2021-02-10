import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../shared/message/message.service';
import { throwError, Observable } from 'rxjs';



@Injectable()
export class ErrorHandlerService {

  constructor(
    private message: MessageService,
  ) { }

   // Manipulação de erros
   handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
   // console.log(error);
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }   
     
    this.message.showMessage(error.message, true);

    return throwError(errorMessage);
  }
}
