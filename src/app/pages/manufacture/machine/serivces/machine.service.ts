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
import { Machine, MachineResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class MachineService {
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

  getAll(dataTablesParameters: any): Observable<MachineResponse> {
    return this.http
      .post<MachineResponse>(`${environment.API_URL}/api/machine_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((machine: MachineResponse) => {
          return machine;
        }));
  }

  getById(machineId: number): Observable<MachineResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/machine/${machineId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(machine: Machine): Observable<Machine> {
    return this.http
      .post<Machine>(`${environment.API_URL}/api/machine`, machine, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(machineId: number, machine: Machine): Observable<Machine> {
    return this.http
      .patch<Machine>(`${environment.API_URL}/api/machine/${machineId}`, machine, this.httpOptions)
      .pipe(catchError(this.handlerError));machine
  }

  delete(machineId: number): Observable<{}> {
    return this.http
      .delete<Machine>(`${environment.API_URL}/api/machine/${machineId}`, this.httpOptions)
      .pipe(
        map((machine: MachineResponse) => {
          return machine;
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
