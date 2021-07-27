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
import { Job, JobResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class JobService {
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

  getAll(dataTablesParameters: any): Observable<JobResponse> {
    return this.http
      .post<JobResponse>(`${environment.API_URL}/api/job_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((job: JobResponse) => {
          return job;
        }));
  }

  getById(jobId: number): Observable<JobResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/job/${jobId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(job: Job): Observable<Job> {
    return this.http
      .post<Job>(`${environment.API_URL}/api/job`, job, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(jobId: number, job: Job): Observable<Job> {
    return this.http
      .patch<Job>(`${environment.API_URL}/api/job/${jobId}`, job, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(jobId: number): Observable<{}> {
    return this.http
      .delete<Job>(`${environment.API_URL}/api/machine/${jobId}`, this.httpOptions)
      .pipe(
        map((job: JobResponse) => {
          return job;
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
