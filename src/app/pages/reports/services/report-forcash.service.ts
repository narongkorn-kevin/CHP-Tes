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
import { ForcashResponse, Branch, ItemResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class ReportForcashService {

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


  getAll(dataTablesParameters:any): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/api/report_forcash`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((item) => {
          return item;
        }));
  }

  getAllLocataion(dataTablesParameters:any): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/api/report_stock_item`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((item) => {
          return item;
        }));
  }

  getItemType(dataTablesParameters:any): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_type`, this.httpOptions)
      .pipe(
        map((itemType: any) => {
          return itemType;
        }));
  }

  getItem(dataTablesParameters:any): Observable<ItemResponse> {
    return this.http
      .post<ItemResponse>(`${environment.API_URL}/api/get_item`,dataTablesParameters, this.httpOptions)
      .pipe(
        map((ItemTran: ItemResponse) => {
          return ItemTran;
        }));
  }



  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getYear(): Observable<ForcashResponse> {
    return this.http
      .get<any>(
        `${environment.API_URL}/api/get_dropdown_year`,
        this.httpOptions
      )
      .pipe(catchError(this.handlerError));
  }

  getCustomer(): Observable<ForcashResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_customer`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

}
