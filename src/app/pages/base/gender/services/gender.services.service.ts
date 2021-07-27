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
import { GenderResponse, Gender } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class GenderService {
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

  getAll(): Observable<GenderResponse> {
    return this.http
      .get<GenderResponse>(`${environment.API_URL}/api/company`, this.httpOptions)
      .pipe(
        map((gender: GenderResponse) => {
          return gender;
        }));
  }

  getById(userId: number): Observable<Gender> {
    return this.http
      .get<any>(`${environment.API_URL}/api/company/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  new(gender: Gender): Observable<Gender> {
    return this.http
      .post<Gender>(`${environment.API_URL}/api/company`, gender, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(genderId: number, gender: Gender): Observable<Gender> {
    return this.http
      .patch<Gender>(`${environment.API_URL}/api/company/${genderId}`, gender, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(genderId: number): Observable<{}> {
    return this.http
      .delete<Gender>(`${environment.API_URL}/api/company/${genderId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
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
