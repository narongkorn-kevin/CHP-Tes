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
import { RegisterResponse, Register, PermissionResponse, DepartmentResponse, BranchResponse, PositionResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` })
  // };

  // httpOptionsFormdata = {
  //   headers: new HttpHeaders({ Authorization: `Bearer ${user.token}` })
  // };

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request));
  }


  addToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const requestWithHeader = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${user.token}`),
    });
    return requestWithHeader;
  }

  // getAll(dataTablesParameters: any): Observable<RegisterResponse> {
  //   return this.http
  //     .post<RegisterResponse>(`${environment.API_URL}/api/user_page`, dataTablesParameters, this.httpOptions)
  //     .pipe(
  //       map((register: RegisterResponse) => {
  //         return register;
  //       }));
  // }

  getDepartment(): Observable<DepartmentResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_department`)
      .pipe(catchError(this.handlerError));
  }

  getBranch(): Observable<BranchResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_branch`)
      .pipe(catchError(this.handlerError));
  }

  getPosition(): Observable<PositionResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_position`)
      .pipe(catchError(this.handlerError));
  }

  getPermission(): Observable<PermissionResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_permission`)
      .pipe(catchError(this.handlerError));
  }


  // getById(userId: number): Observable<Employee> {
  //   return this.http
  //     .get<any>(`${environment.API_URL}/user/${userId}` , this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }

  new(register: FormData): Observable<Register> {
    return this.http
      .post<Register>(`${environment.API_URL}/api/register`, register)
      .pipe(catchError(this.handlerError));
  }

  // update(userId: number, employee: Employee): Observable<Employee> {
  //   return this.http
  //     .patch<Employee>(`${environment.API_URL}/update_user/${userId}`, employee, this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }

  // delete(employeeId: number): Observable<{}> {
  //   return this.http
  //     .delete<Employee>(`${environment.API_URL}/api/user/${employeeId}`, this.httpOptions)
  //     .pipe(
  //       map((position: EmployeeResponse) => {
  //         return position;
  //       }),
  //       catchError((err) => this.handlerError(err))
  //       );

  // }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
