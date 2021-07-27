import { SaleOrder } from './../../../../shared/models/base.interface';
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

import { catchError, map } from 'rxjs/operators';
import { Customer, EmployeeResponse, ItemResponse, ItemTypeResponse, SaleOrderResponse, UnitConvertionResponse } from '@app/shared/models/base.interface';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
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


  getAll(dataTablesParameters: any): Observable<SaleOrderResponse> {
    return this.http
      .post<SaleOrderResponse>(`${environment.API_URL}/api/delevery_order_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((saleorder: SaleOrderResponse) => {
          return saleorder;
        }));
  }

  // tslint:disable-next-line:ban-types
  getItem(ItemTypeID: String): Observable<ItemResponse> {
    return this.http
      .post<any>(`${environment.API_URL}/api/get_item`, { item_type_id: ItemTypeID }, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }


  // tslint:disable-next-line:ban-types
  getItemDelivery(ItemId: String): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/delevery_order/` + ItemId, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // tslint:disable-next-line:ban-types
  getUnitSell(ItemTypeID: String): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/item/` + ItemTypeID, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  approve(saleId: number, status: string): Observable<SaleOrderResponse> {
    return this.http
      .put<SaleOrderResponse>(`${environment.API_URL}/api/approve_delevery_order/${saleId}`, { status: status }, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getCustomerList(): Observable<Customer> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_customer`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getItemType(): Observable<ItemTypeResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_type`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // tslint:disable-next-line:ban-types
  getUnitConvertion(ItemTypeID: Number, UnitId: Number): Observable<UnitConvertionResponse> {
    return this.http
      .post<any>(`${environment.API_URL}/api/get_unit_convertion_by_unit`, { item_type_id: ItemTypeID, unit_id: UnitId }, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getWarehouse(): Observable<SaleOrderResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_warehouse`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getSaleOrder(): Observable<EmployeeResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_sale_order`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }


  getById(locationId: number): Observable<Location> {
    return this.http
      .get<any>(`${environment.API_URL}/api/location/${locationId}`)
      .pipe(catchError(this.handlerError));
  }

  getSaleItem(SaleId: number): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/api/sale_order/${SaleId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(Saleorder: FormData): Observable<Location> {
    console.log(this.httpOptions);
    return this.http
      .post<Location>(`${environment.API_URL}/api/delevery_order`, Saleorder, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  import(Saleorder: FormData): Observable<SaleOrder> {
    console.log(this.httpOptions);
    return this.http
      .post<SaleOrder>(`${environment.API_URL}/api/import_delevery_order`, Saleorder, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }

  update(locationId: number, location: Location): Observable<Location> {
    return this.http
      .patch<Location>(`${environment.API_URL}/api/location/${locationId}`, location, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(locationId: number): Observable<{}> {
    return this.http
      .delete<SaleOrderResponse>(`${environment.API_URL}/api/location/${locationId}`, this.httpOptions)
      .pipe(
        map((location: SaleOrderResponse) => {
          return location;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  Import(Saleorder: FormData): Observable<SaleOrder> {
    return this.http
      .post<SaleOrder>(`${environment.API_URL}/api/import_delevery_order`, Saleorder, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }


  getCustomer(): Observable<SaleOrderResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_customer`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
}

