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
import { OfficerResponse, Customer } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OfficeServiceService {
  constructor(private http: HttpClient) {}
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjaHAiLCJhdWQiOjEsImx1biI6eyJpZCI6MSwiaWRfY2FyZCI6IjExMTExMTExMTExMTEiLCJwcmVmaXhfdGgiOiJcdTBlMTlcdTBlMzJcdTBlMjIiLCJwcmVmaXhfZW4iOiJNci4iLCJmbmFtZV90aCI6Ilx1MGUxZVx1MGUwN1x1MGUyOFx1MGUwMVx1MGUyMyIsImxuYW1lX3RoIjoiXHUwZTBhXHUwZTMxXHUwZTIyXHUwZTQwXHUwZTA4XHUwZTIzXHUwZTM0XHUwZTBkXHUwZTQ0XHUwZTIxXHUwZTE1XHUwZTIzXHUwZTM1IiwiZm5hbWVfZW4iOiJQb25zYWtvcm4iLCJsbmFtZV9lbiI6IkNoYWljaGFyb25lIiwicG9zaXRpb24iOiJcdTBlNDBcdTBlMDhcdTBlNDlcdTBlMzJcdTBlMmJcdTBlMTlcdTBlNDlcdTBlMzJcdTBlMTdcdTBlMzVcdTBlNDggXHUwZTJhXHUwZTFiXHUwZTJhXHUwZTBhIiwiZW1haWwiOiJib3NzQGdtYWlsLmNvbSIsInZpbGxhZ2UiOiIxMjM0IiwidmlsbGFnZV9ubyI6bnVsbCwiYWxsZXkiOiJcdTBlMjVcdTBlMzJcdTBlMTRcdTBlMDFcdTBlMjNcdTBlMzBcdTBlMWFcdTBlMzFcdTBlMDcgNjUiLCJyb2FkIjoiXHUwZTI1XHUwZTMyXHUwZTE0XHUwZTAxXHUwZTIzXHUwZTMwXHUwZTFhXHUwZTMxXHUwZTA3Iiwic3ViX2Rpc3RyaWN0IjoiXHUwZTI1XHUwZTMyXHUwZTE0XHUwZTAxXHUwZTIzXHUwZTMwXHUwZTFhXHUwZTMxXHUwZTA3IiwiZGlzdHJpY3QiOiJcdTBlNDBcdTBlMDJcdTBlMTVcdTBlMjVcdTBlMzJcdTBlMTRcdTBlMDFcdTBlMjNcdTBlMzBcdTBlMWFcdTBlMzFcdTBlMDciLCJwcm92aW5jZSI6Ilx1MGUwMVx1MGUyM1x1MGUzOFx1MGUwN1x1MGU0MFx1MGUxN1x1MGUxZVx1MGUyMVx1MGUyYlx1MGUzMlx1MGUxOVx1MGUwNFx1MGUyMyIsInBvc3RhbF9jb2RlIjoiMTA1MjAiLCJwaG9uZSI6IjA5MDAwMDAwMDAiLCJtb2JpbGVfcGhvbmUiOm51bGwsInN0YXR1cyI6IlllcyIsImNyZWF0ZV9ieSI6ImFkbWluIiwidXBkYXRlX2J5IjoiXHUwZTFlXHUwZTA3XHUwZTI4XHUwZTAxXHUwZTIzIFx1MGUwYVx1MGUzMVx1MGUyMlx1MGU0MFx1MGUwOFx1MGUyM1x1MGUzNFx1MGUwZFx1MGU0NFx1MGUyMVx1MGUxNVx1MGUyM1x1MGUzNSIsImNyZWF0ZWRfYXQiOiIyOFwvMDdcLzIwMjEgMDM6MTE6NTAiLCJ1cGRhdGVkX2F0IjoiMjhcLzA3XC8yMDIxIDAzOjI1OjAzIn0sImlhdCI6MTYyNzQ3NTA3OSwiZXhwIjoxNjI3NTYxNDc5LCJuYmYiOjE2Mjc0NzUwNzl9.W8GKU31c3jxZ0Vlg7sSYgPIoF8rp3qGDMFH233ssR8Q';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` })
  };

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request));
  }


  addToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const requestWithHeader = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.token}`),
    });
    return requestWithHeader;
  }
 
  getAll(dataTablesParameters: any): Observable<any> {
    return this.http
      .post<OfficerResponse>(`${environment.API_URLCHP}/api/user_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((officer: OfficerResponse) => {
          return officer;
        }));
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

