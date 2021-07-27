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
import { EmployeeResponse, Employee, PermissionResponse, DepartmentResponse, BranchResponse, PositionResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
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

  getAll(dataTablesParameters: any): Observable<EmployeeResponse> {
    return this.http
      .post<EmployeeResponse>(`${environment.API_URL}/api/user_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((employee: EmployeeResponse) => {
          return employee;
        }));
  }

  getAllReqeust(dataTablesParameters: any): Observable<EmployeeResponse> {
    return this.http
      .post<EmployeeResponse>(`${environment.API_URL}/api/activate_user_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((employee: EmployeeResponse) => {
          return employee;
        }));
  }

  getDepartment(): Observable<DepartmentResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_department`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getBranch(): Observable<BranchResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_branch`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getPosition(): Observable<PositionResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_position`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getPermission(): Observable<PermissionResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_permission`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }


  getById(userId: number): Observable<Employee> {
    return this.http
      .get<any>(`${environment.API_URL}/api/user/${userId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(employee: FormData): Observable<Employee> {
    return this.http
      .post<Employee>(`${environment.API_URL}/api/user`, employee, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }

  update(userId: number, employee: FormData): Observable<Employee> {
    return this.http
      .post<Employee>(`${environment.API_URL}/api/update_user`, employee, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }


  updateProfile(userId: number, employee: FormData): Observable<Employee> {
    return this.http
      .post<Employee>(`${environment.API_URL}/api/update_profile_user`, employee, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }

  changePassword(employeeId: number, employee: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`${environment.API_URL}/api/reset_password_user/${employeeId}`, employee, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }


  activate(employeeId: number, employee: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`${environment.API_URL}/api/activate_user/${employeeId}`, employee, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // changestatus(employeeId: number, employee: Employee): Observable<Employee> {
  //   return this.http
  //     .patch<Employee>(`${environment.API_URL}/api/activate_user/${employeeId}`, employee, this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }


  delete(employeeId: number): Observable<{}> {
    return this.http
      .delete<Employee>(`${environment.API_URL}/api/user/${employeeId}`, this.httpOptions)
      .pipe(
        map((employee: EmployeeResponse) => {
          return employee;
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

  getProfile(): Observable<EmployeeResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/user_profile` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
}
