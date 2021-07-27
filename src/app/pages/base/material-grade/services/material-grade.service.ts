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
import { MaterialGradeResponse, MaterialGrade } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class MaterialGradeService {
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


  getAll(dataTablesParameters: any): Observable<MaterialGradeResponse> {
    return this.http
      .post<MaterialGradeResponse>(`${environment.API_URL}/api/material_grade_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((materialtype: MaterialGradeResponse) => {
          return materialtype;
        }));
  }

  getById(materialgradeId: number): Observable<MaterialGrade> {
    return this.http
      .get<any>(`${environment.API_URL}/api/material_grade/${materialgradeId}`)
      .pipe(catchError(this.handlerError));
  }

  new(materialgrade: MaterialGrade): Observable<MaterialGrade> {
    console.log(this.httpOptions);
    return this.http
      .post<MaterialGrade>(`${environment.API_URL}/api/material_grade`, materialgrade, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(materialgradeId: number, materialgrade: MaterialGrade): Observable<MaterialGrade> {
    return this.http
      .patch<MaterialGrade>(`${environment.API_URL}/api/material_grade/${materialgradeId}`, materialgrade, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(materialgradeId: number): Observable<{}> {
    return this.http
      .delete<MaterialGradeResponse>(`${environment.API_URL}/api/material_grade/${materialgradeId}`, this.httpOptions)
      .pipe(
        map((materialgrade: MaterialGradeResponse) => {
          return materialgrade;
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
