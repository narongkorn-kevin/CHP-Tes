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
import { catchError, map } from 'rxjs/operators';
import { OfficerResponse, Officer } from '@app/shared/models/base.interface';

const user = JSON.parse(localStorage.getItem('user')) || null;

@Injectable({
  providedIn: 'root',
})
export class OfficeServiceService {
  constructor(private http: HttpClient) { }
  httpOptions = {
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

  
  getAll(dataTablesParameters: any): Observable<OfficerResponse> {
    return this.http
      .post<OfficerResponse>(`${environment.API_URL}/api/user_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((officer: OfficerResponse) => {
          return officer;
        }));
  }

  Add(dataTablesParameters: any): Observable<OfficerResponse> {
    return this.http
      .post<OfficerResponse>(`${environment.API_URL}/api/user`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((officer: OfficerResponse) => {
          return officer;
        }));
  }

  New(officer: Officer): Observable<Officer> {
    return this.http
      .post<Officer>(`${environment.API_URL}/api/user`, officer, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  Update(officerId: number, officer: OfficerResponse): Observable<OfficerResponse> {
    return this.http
      .patch<OfficerResponse>(`${environment.API_URL}/api/user/${officerId}`, officer, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getDistrict(dataTablesParameters: any): Observable<OfficerResponse> {
    return this.http
      .post<OfficerResponse>(`${environment.API_URL}/api/get_district`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((officer: OfficerResponse) => {
          return officer;
        }));
  }

  getSubDistrict(dataTablesParameters: any): Observable<OfficerResponse> {
    return this.http
      .post<OfficerResponse>(`${environment.API_URL}/api/get_sub_district`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((officer: OfficerResponse) => {
          return officer;
        }));
  }
  
  getProvince(): Observable<OfficerResponse> {
    return this.http
    .get<any>(`${environment.API_URL}/api/get_province`, this.httpOptions)
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

