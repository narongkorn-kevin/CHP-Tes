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
import { MaterialColorResponse, MaterialColor } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class MaterialColorService {
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


  getAll(dataTablesParameters: any): Observable<MaterialColorResponse> {
    return this.http
      .post<MaterialColorResponse>(`${environment.API_URL}/api/material_color_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((materialcolor: MaterialColorResponse) => {
          return materialcolor;
        }));
  }

  getById(materialcolorId: number): Observable<MaterialColor> {
    return this.http
      .get<any>(`${environment.API_URL}/api/material_grade/${materialcolorId}`)
      .pipe(catchError(this.handlerError));
  }

  new(materialcolor: MaterialColor): Observable<MaterialColor> {
    console.log(this.httpOptions);
    return this.http
      .post<MaterialColor>(`${environment.API_URL}/api/material_color`, materialcolor, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(materialcolorId: number, materialcolor: MaterialColor): Observable<MaterialColor> {
    return this.http
      .patch<MaterialColor>(`${environment.API_URL}/api/material_color/${materialcolorId}`, materialcolor, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(materialcolorId: number): Observable<{}> {
    return this.http
      .delete<MaterialColorResponse>(`${environment.API_URL}/api/material_color/${materialcolorId}`, this.httpOptions)
      .pipe(
        map((materialcolor: MaterialColorResponse) => {
          return materialcolor;
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
