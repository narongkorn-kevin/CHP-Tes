import { UnitResponse, UnitConvertionResponse, UnitConvertion } from './../../../../shared/models/base.interface';
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
import { WarehouseResponse, Warehouse, ItemTypeResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class UnitConvertionService {
  constructor(private http: HttpClient) { }
  httpOptions = {
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


  getAll(dataTablesParameters: any): Observable<UnitConvertionResponse> {
    return this.http
      .post<UnitConvertionResponse>(`${environment.API_URL}/api/unit_convertion_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((unitconvertion: UnitConvertionResponse) => {
          return unitconvertion;
        }));
  }

  getById(unitconvertionId: number): Observable<UnitConvertion> {
    return this.http
      .get<any>(`${environment.API_URL}/api/unit_convertion/${unitconvertionId}`)
      .pipe(catchError(this.handlerError));
  }

  new(unitconvertion: UnitConvertion): Observable<UnitConvertion> {
    console.log(this.httpOptions);
    return this.http
      .post<UnitConvertion>(`${environment.API_URL}/api/unit_convertion`, unitconvertion, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(unitconvertionId: number, unitconvertion: UnitConvertion): Observable<UnitConvertion> {
    return this.http
      .patch<UnitConvertion>(`${environment.API_URL}/api/unit_convertion/${unitconvertionId}`, unitconvertion, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(unitconvertionId: number): Observable<{}> {
    return this.http
      .delete<UnitConvertionResponse>(`${environment.API_URL}/api/unit_convertion/${unitconvertionId}`, this.httpOptions)
      .pipe(
        map((unitconvertion: UnitConvertionResponse) => {
          return unitconvertion;
        }),
        catchError((err) => this.handlerError(err))
        );
  }
  getUnit(): Observable<UnitConvertionResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_unit` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  getItemType(): Observable<UnitConvertionResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_type` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  getitemtype(): Observable<UnitConvertionResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_type` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
}

