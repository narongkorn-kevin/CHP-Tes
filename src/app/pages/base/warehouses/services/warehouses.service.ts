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
import { WarehouseResponse, Warehouse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class WarehousesService {
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


  getAll(dataTablesParameters: any): Observable<WarehouseResponse> {
    return this.http
      .post<WarehouseResponse>(`${environment.API_URL}/api/warehouse_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((warehouse: WarehouseResponse) => {
          return warehouse;
        }));
  }

  getById(warehousesId: number): Observable<Warehouse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/warehouse/${warehousesId}`)
      .pipe(catchError(this.handlerError));
  }

  new(warehousesId: Warehouse): Observable<Warehouse> {
    console.log(this.httpOptions);
    return this.http
      .post<Warehouse>(`${environment.API_URL}/api/warehouse`, warehousesId, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(warehousesId: number, warehouse: Warehouse): Observable<Warehouse> {
    return this.http
      .patch<Warehouse>(`${environment.API_URL}/api/warehouse/${warehousesId}`, warehouse, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(warehousesId: number): Observable<{}> {
    return this.http
      .delete<WarehouseResponse>(`${environment.API_URL}/api/warehouse/${warehousesId}`, this.httpOptions)
      .pipe(
        map((warehouse: WarehouseResponse) => {
          return warehouse;
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
