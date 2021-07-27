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
import { CompanyResponse, Company } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
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

  getAll(): Observable<CompanyResponse> {
    return this.http
      .get<CompanyResponse>(`${environment.API_URL}/api/company`, this.httpOptions)
      .pipe(
        map((company: CompanyResponse) => {
          return company;
        }));
  }

  getById(userId: number): Observable<Company> {
    return this.http
      .get<any>(`${environment.API_URL}/users/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  new(company: Company): Observable<Company> {
    return this.http
      .post<Company>(`${environment.API_URL}/api/company`, company)
      .pipe(catchError(this.handlerError));
  }

  update(userId: number, company: Company): Observable<Company> {
    return this.http
      .patch<Company>(`${environment.API_URL}/users/${userId}`, company)
      .pipe(catchError(this.handlerError));
  }

  delete(userId: number): Observable<{}> {
    return this.http
      .delete<Company>(`${environment.API_URL}/users/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.error.message}`;
    }
    window.alert(1);
    return throwError(errorMessage);
  }
}
