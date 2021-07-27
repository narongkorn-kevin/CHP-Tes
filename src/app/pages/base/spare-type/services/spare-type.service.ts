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
import { SpareTypeResponse, SpareType } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class SpareTypeService {
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


  getAll(dataTablesParameters: any): Observable<SpareTypeResponse> {
    return this.http
      .post<SpareTypeResponse>(`${environment.API_URL}/api/spare_type_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((sparetype: SpareTypeResponse) => {
          return sparetype;
        }));
  }

  getById(sparetypeId: number): Observable<SpareType> {
    return this.http
      .get<any>(`${environment.API_URL}/api/spare_type/${sparetypeId}`)
      .pipe(catchError(this.handlerError));
  }

  new(sparetype: SpareType): Observable<SpareType> {
    console.log(this.httpOptions);
    return this.http
      .post<SpareType>(`${environment.API_URL}/api/spare_type`, sparetype, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(sparetypeId: number, sparetype: SpareType): Observable<SpareType> {
    return this.http
      .patch<SpareType>(`${environment.API_URL}/api/spare_type/${sparetypeId}`, sparetype, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(sparetypeId: number): Observable<{}> {
    return this.http
      .delete<SpareTypeResponse>(`${environment.API_URL}/api/spare_type/${sparetypeId}`, this.httpOptions)
      .pipe(
        map((sparetype: SpareTypeResponse) => {
          return sparetype;
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
