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
import { MaterialTypeResponse, MaterialType } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class MaterialTypeService {
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


  getAll(dataTablesParameters: any): Observable<MaterialTypeResponse> {
    return this.http
      .post<MaterialTypeResponse>(`${environment.API_URL}/api/material_type_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((materialtype: MaterialTypeResponse) => {
          return materialtype;
        }));
  }

  getById(materialtypeId: number): Observable<MaterialType> {
    return this.http
      .get<any>(`${environment.API_URL}/api/material_type/${materialtypeId}`)
      .pipe(catchError(this.handlerError));
  }

  new(materialtype: MaterialType): Observable<MaterialType> {
    console.log(this.httpOptions);
    return this.http
      .post<MaterialType>(`${environment.API_URL}/api/material_type`, materialtype, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(materialtypeId: number, materialtype: MaterialType): Observable<MaterialType> {
    return this.http
      .patch<MaterialType>(`${environment.API_URL}/api/material_type/${materialtypeId}`, materialtype, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(materialtypeId: number): Observable<{}> {
    return this.http
      .delete<MaterialTypeResponse>(`${environment.API_URL}/api/material_type/${materialtypeId}`, this.httpOptions)
      .pipe(
        map((materialtype: MaterialTypeResponse) => {
          return materialtype;
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
