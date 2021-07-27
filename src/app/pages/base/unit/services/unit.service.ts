import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Unit , UnitResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class UnitService {
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` })
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


  getAll(dataTablesParameters: any): Observable<UnitResponse> {
    return this.http
      .post<UnitResponse>(`${environment.API_URL}/api/unit_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((unit: UnitResponse) => {
          return unit;
        }));
  }

  getById(unitId: number): Observable<Unit> {
    return this.http
      .get<any>(`${environment.API_URL}/api/unit/${unitId}`)
      .pipe(catchError(this.handlerError));
  }

  new(unit: Unit): Observable<Unit> {
    console.log(this.httpOptions);
    return this.http
      .post<Unit>(`${environment.API_URL}/api/unit`, unit, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(unitId: number, unit: Unit): Observable<Unit> {
    return this.http
      .patch<Unit>(`${environment.API_URL}/api/unit/${unitId}`, unit, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(unitId: number): Observable<{}> {
    return this.http
      .delete<UnitResponse>(`${environment.API_URL}/api/unit/${unitId}`, this.httpOptions)
      .pipe(
        map((unit: UnitResponse) => {
          return unit;
        }),
        catchError((err) => this.handlerError(err))
        );
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
