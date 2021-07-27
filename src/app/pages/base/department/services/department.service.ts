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
import { DepartmentResponse, Department } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
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

  // getAll(): Observable<DepartmentResponse> {
  //   return this.http
  //     .get<DepartmentResponse>(`${environment.API_URL}/api/department`, this.httpOptions)
  //     .pipe(
  //       map((department: DepartmentResponse) => {
  //         return department;
  //       }));
  // }

  getAll(dataTablesParameters: any): Observable<DepartmentResponse> {
    return this.http
      .post<DepartmentResponse>(`${environment.API_URL}/api/department_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((department: DepartmentResponse) => {
          return department;
        }));
      }


  getById(departmentId: number): Observable<Department> {
    return this.http
      .get<any>(`${environment.API_URL}/api/department/${departmentId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(department: Department): Observable<Department> {
    return this.http
      .post<Department>(`${environment.API_URL}/api/department`, department, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(departmentId: number, department: Department): Observable<Department> {
    return this.http
      .patch<Department>(`${environment.API_URL}/api/department/${departmentId}`, department, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(departmentId: number): Observable<{}> {
    return this.http
      .delete<Department>(`${environment.API_URL}/api/department/${departmentId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
