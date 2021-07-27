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
import { PermissionResponse, Permission } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
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

  // getAll(): Observable<PositionResponse> {
  //   return this.http
  //     .get<PositionResponse>(`${environment.API_URL}/api/position`, this.httpOptions)
  //     .pipe(
  //       map((position: PositionResponse) => {
  //         return position;
  //       }));
  // }

  getAll(dataTablesParameters: any): Observable<PermissionResponse> {
    return this.http
      .post<PermissionResponse>(`${environment.API_URL}/api/permission_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((permission: PermissionResponse) => {
          return permission;
        }));
  }

  getById(permissionId: number): Observable<Permission> {
    return this.http
      .get<any>(`${environment.API_URL}/api/permission/${permissionId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(permission: Permission): Observable<Permission> {
    return this.http
      .post<Permission>(`${environment.API_URL}/api/permission`, permission, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(permission: Permission): Observable<Permission> {
    return this.http
      .post<Permission>(`${environment.API_URL}/api/menu`, permission, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(permissionId: number): Observable<{}> {
    return this.http
      .delete<Permission>(`${environment.API_URL}/api/permission/${permissionId}`, this.httpOptions)
      .pipe(
        map((permission: PermissionResponse) => {
          return permission;
        }),
        catchError((err) => this.handlerError(err))
        );
  }

  getPermissionMenu(): Observable<PermissionResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/menu`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }


  getPermissionMenubyId(permission_id: number): Observable<PermissionResponse> {
    return this.http
      .post<any>(`${environment.API_URL}/api/get_permisson_menu`, { permissionId: permission_id }, this.httpOptions)
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


