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
import { DepositResponse, Deposit, ItemResponse, LocationResponse, ItemTypeResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class DepositService {
  constructor(private http: HttpClient) { }
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

//// Get////
  getAll(dataTablesParameters: any): Observable<DepositResponse> {
    return this.http
      .post<DepositResponse>(`${environment.API_URL}/api/report_stock_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((deposit: DepositResponse) => {
          return deposit;
        }));
  }

  getItem(ItemTypeID: String): Observable<ItemResponse> {
    return this.http
      .post<any>(`${environment.API_URL}/api/get_item`, { item_type_id: ItemTypeID }, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getById(locationId: number): Observable<Location> {
    return this.http
      .get<any>(`${environment.API_URL}/api/location/${locationId}`)
      .pipe(catchError(this.handlerError));
  }

  getLocation(): Observable<LocationResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_location` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  
  getItemType(): Observable<ItemTypeResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_type` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // getSize(): Observable<SizeResponse> {
  //   return this.http
  //     .get<any>(`${environment.API_URL}/api/get_size` , this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }

//// Get////


  // getReportById(depositId: number): Observable<Deposit> {
  //   return this.http
  //     .get<any>(`${environment.API_URL}/api/report_stock/${depositId}` , this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }

  getReportById(ItemId: String): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/report_stock/` + ItemId, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(depositId: number, deposit: Deposit): Observable<Deposit> {
    return this.http
      .put<Deposit>(`${environment.API_URL}/api/appove_report_stock/${depositId}`, deposit, this.httpOptions)
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
  new(deposit: FormData): Observable<Deposit> {
    return this.http
      .post<Deposit>(`${environment.API_URL}/api/report_deposit_item`, deposit, this.httpOptions)
      .pipe(catchError(this.handlerError));
}

getApprove(depositId: String): Observable<ItemResponse> {
  return this.http
    .get<any>(`${environment.API_URL}/api/report_stock/` + depositId, this.httpOptions)
    .pipe(catchError(this.handlerError));
}

approve(depositId: number, status: string): Observable<ItemResponse> {
  return this.http
    .put<ItemResponse>(`${environment.API_URL}/api/appove_report_stock/${depositId}`, { status: status }, this.httpOptions)
    .pipe(catchError(this.handlerError));
}
updateTrans(depositId: number, deposit: Deposit): Observable<Deposit> {
  return this.http
    .put<Deposit>(`${environment.API_URL}/api/item_trans/${depositId}`, deposit, this.httpOptions)
    .pipe(catchError(this.handlerError));
}


}
