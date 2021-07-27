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
import { BranchResponse, Branch } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class BranchService {
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


  getAll(dataTablesParameters: any): Observable<BranchResponse> {
    return this.http
      .post<BranchResponse>(`${environment.API_URL}/api/branch_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((branch: BranchResponse) => {
          return branch;
        }));
  }

  getById(branchId: number): Observable<Branch> {
    return this.http
      .get<any>(`${environment.API_URL}/api/branch/${branchId}`)
      .pipe(catchError(this.handlerError));
  }

  new(branch: Branch): Observable<Branch> {
    console.log(this.httpOptions);
    return this.http
      .post<Branch>(`${environment.API_URL}/api/branch`, branch, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(branchId: number, branch: Branch): Observable<Branch> {
    return this.http
      .patch<Branch>(`${environment.API_URL}/api/branch/${branchId}`, branch, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(branchId: number): Observable<{}> {
    return this.http
      .delete<BranchResponse>(`${environment.API_URL}/api/branch/${branchId}`, this.httpOptions)
      .pipe(
        map((branch: BranchResponse) => {
          return branch;
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
