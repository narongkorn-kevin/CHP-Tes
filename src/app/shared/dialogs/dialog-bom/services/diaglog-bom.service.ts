import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { UnitConvertionResponse, UnitConvertion, ItemResponse, LocationResponse, ItemTypeResponse, BomResponse } from '@app/shared/models/base.interface';
import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
const user = JSON.parse(localStorage.getItem('user')) || null;

@Injectable({
  providedIn: 'root'
})
export class DiaglogBomService {

  constructor(
    private http: HttpClient
  ) { }
  httpOptions = {
    headers: new HttpHeaders({Authorization: `Bearer ${user.token}` })
  };
  httpOptionsFormdata = {
    headers: new HttpHeaders({ Authorization: `Bearer ${user.token}` })
  };
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request));
  }


  addToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const requestWithHeader = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${user.token}`),
    });
    return requestWithHeader;
  }
  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  ///get item///
  getBom(): Observable<BomResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_bom`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }



}
