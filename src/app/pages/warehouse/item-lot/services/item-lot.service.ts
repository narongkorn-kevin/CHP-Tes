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
import { DepositResponse, Deposit, ItemResponse, LocationResponse, ItemTypeResponse, ItemLotResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class ItemLotService {
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
  getAll(dataTablesParameters: any): Observable<ItemLotResponse> {
    return this.http
      .post<ItemLotResponse>(`${environment.API_URL}/api/item_lot_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((itemlot: ItemLotResponse) => {
          return itemlot;
        }));
  }
a


  getItem(ItemTypeID: String): Observable<ItemResponse> {
    return this.http
      .post<any>(`${environment.API_URL}/api/get_item`, { item_type_id: ItemTypeID }, this.httpOptions)
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

  getItemLot(): Observable<ItemLotResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_lot` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // getSize(): Observable<SizeResponse> {
  //   return this.http
  //     .get<any>(`${environment.API_URL}/api/get_size` , this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }

//// Get////


  getById(depositId: number): Observable<Deposit> {
    return this.http
      .get<any>(`${environment.API_URL}/item/${depositId}` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // new(item: FormData): Observable<Item> {
  //   return this.http
  //     .post<Item>(`${environment.API_URL}/api/item`, item, this.httpOptionsFormdata)
  //     .pipe(catchError(this.handlerError));
  // }
  // Import(item: FormData): Observable<Item> {
  //   return this.http
  //     .post<Item>(`${environment.API_URL}/api/import_item`, item, this.httpOptionsFormdata)
  //     .pipe(catchError(this.handlerError));
  // }

  update(depositId: number, deposit: Deposit): Observable<Deposit> {
    return this.http
      .put<Deposit>(`${environment.API_URL}/api/appove_report_stock/${depositId}`, deposit, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // delete(itemId: number): Observable<{}> {
  //   return this.http
  //     .delete<Item>(`${environment.API_URL}/api/item/${itemId}`, this.httpOptions)
  //     .pipe(
  //       map((position: ItemResponse) => {
  //         return position;
  //       }),
  //       catchError((err) => this.handlerError(err))
  //       );

  // }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      //console.log('myerror',error);
      errorMessage = `Error ${error.error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  new(deposit: FormData): Observable<Deposit> {
    return this.http
      .post<Deposit>(`${environment.API_URL}/api/report_deposit_lot_item`, deposit, this.httpOptions)
      .pipe(catchError(this.handlerError));
}
}
