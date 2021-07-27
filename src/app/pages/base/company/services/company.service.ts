import { CompanyProfile, CompanyProfileResponse } from './../../../../shared/models/base.interface';
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
      .get<any>(`${environment.API_URL}/api/config/${userId}`)
      .pipe(catchError(this.handlerError));
  }
  getcompany(): Observable<CompanyProfileResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/config`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(company: FormData): Observable<CompanyProfile> {
    return this.http
      .post<CompanyProfile>(`${environment.API_URL}/api/config`, company, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }

  update(companyId: number , company: FormData): Observable<Company> {
    return this.http
      .patch<Company>(`${environment.API_URL}/api/company/${companyId}`, company, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }

  delete(companyId: number): Observable<{}> {
    return this.http
      .delete<Company>(`${environment.API_URL}/api/company/${companyId}`, this.httpOptions)
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
