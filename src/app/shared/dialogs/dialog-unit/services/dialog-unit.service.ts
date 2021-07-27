import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DepositResponse, Deposit, ItemResponse, LocationResponse, ItemTypeResponse } from '@app/shared/models/base.interface';
import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
const user = JSON.parse(localStorage.getItem('user')) || null;

@Injectable({
  providedIn: 'root'
})
export class DialogUnitService {

  constructor(
    private http: HttpClient
  ) { }
  httpOptions = {
    headers: new HttpHeaders({Authorization: `Bearer ${user.token}` })
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
  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  ///get item///
  getUnitConvertion(ItemTypeID: String): Observable<ItemResponse> {
    return this.http
      .post<any>(`${environment.API_URL}/api/get_unit_convertion`,{ item_type_id: ItemTypeID } , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }


  getItemType(): Observable<ItemTypeResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_type` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

}
