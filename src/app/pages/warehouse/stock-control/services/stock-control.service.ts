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
import { StockControlResponse, StockControl } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class StockControlService {
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


  getAll(dataTablesParameters: any): Observable<StockControlResponse> {
    return this.http
      .post<StockControlResponse>(`${environment.API_URL}/api/stock_control_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((stockcontrol: StockControlResponse) => {
          return stockcontrol;
        }));
  }

  getById(stockcontrolId: number): Observable<StockControl> {
    return this.http
      .get<any>(`${environment.API_URL}/api/warehouse/${stockcontrolId}`)
      .pipe(catchError(this.handlerError));
  }

  new(stockcontrol: StockControl): Observable<StockControl> {
    console.log(this.httpOptions);
    return this.http
      .post<StockControl>(`${environment.API_URL}/api/stock_control`, stockcontrol, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(stockcontrolId: number, stockcontrol: StockControl): Observable<StockControl> {
    return this.http
      .put<StockControl>(`${environment.API_URL}/api/stock_control/${stockcontrolId}`, stockcontrol, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(stockcontrolId: number): Observable<{}> {
    return this.http
      .delete<StockControlResponse>(`${environment.API_URL}/api/stock_control/${stockcontrolId}`, this.httpOptions)
      .pipe(
        map((stockcontrol: StockControlResponse) => {
          return stockcontrol;
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

  getitemtype(): Observable<StockControlResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_type` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getstockcontrolbyId(stockcontrolId: number): Observable<StockControlResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/stock_control/${stockcontrolId}` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }



  getuser(): Observable<StockControlResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_user` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

}
