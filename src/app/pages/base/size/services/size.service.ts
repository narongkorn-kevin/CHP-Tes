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
import { SizeResponse, Size } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class SizeService {
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

  // getAll(): Observable<BranchResponse> {
  //   return this.http
  //     .get<BranchResponse>(`${environment.API_URL}/api/branch`, this.httpOptions)
  //     .pipe(
  //       map((branch: BranchResponse) => {
  //         return branch;
  //       }));
  // }

  getAll(dataTablesParameters: any): Observable<SizeResponse> {
    return this.http
      .post<SizeResponse>(`${environment.API_URL}/api/size_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((size: SizeResponse) => {
          return size;
        }));
  }

  getById(sizeId: number): Observable<Size> {
    return this.http
      .get<any>(`${environment.API_URL}/api/size/${sizeId}`)
      .pipe(catchError(this.handlerError));
  }

  new(size: Size): Observable<Size> {
    console.log(this.httpOptions);
    return this.http
      .post<Size>(`${environment.API_URL}/api/size`, size, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(sizeId: number, size: Size): Observable<Size> {
    return this.http
      .patch<Size>(`${environment.API_URL}/api/size/${sizeId}`, size, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(sizeId: number): Observable<{}> {
    return this.http
      .delete<SizeResponse>(`${environment.API_URL}/api/size/${sizeId}`, this.httpOptions)
      .pipe(
        map((size: SizeResponse) => {
          return size;
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
