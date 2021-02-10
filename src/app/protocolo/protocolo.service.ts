import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Protocolo } from './protocolo.model';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProtocoloService {

   URL = `${environment.api}/protocolo`;

  constructor(
    private http: HttpClient,
    private handler: ErrorHandlerService
    ) { }

  read(): Observable<Protocolo[]>{
    return this.http.get<Protocolo[]>(this.URL).pipe(
      map((obj) => obj),
      catchError((e) => this.handler.handleError(e))
    );
  }

  create(protocolo: Protocolo): Observable<Protocolo> {
    return this.http.post<Protocolo>(this.URL, protocolo).pipe(
      map((obj) => obj),
      catchError((e) => this.handler.handleError(e))
    );
  }

  readById(id: number): Observable<Protocolo> {
    const url = `${this.URL}/${id}`;
    return this.http.get<Protocolo>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.handler.handleError(e))
      );
  }

  update(protocolo: Protocolo): Observable<Protocolo> {
    const url = `${this.URL}/${protocolo.id}`;
    return this.http.put<Protocolo>(url, protocolo).pipe(
      map((obj) => obj),
      catchError((e) => this.handler.handleError(e))
    );
  }

  delete(id: number): Observable<Protocolo> {
    const url = `${this.URL}/${id}`;
    return this.http.delete<Protocolo>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.handler.handleError(e))
    );
  }

}
