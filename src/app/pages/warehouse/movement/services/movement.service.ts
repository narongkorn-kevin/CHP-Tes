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
import { MovementResponse, Movement, ItemResponse, LocationResponse, ItemTypeResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class MovementService {
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ Authorization: `Bearer ${user.token}` })
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
  getAll(dataTablesParameters: any): Observable<MovementResponse> {
    return this.http
      .post<MovementResponse>(`${environment.API_URL}/api/report_stock_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((movement: MovementResponse) => {
          return movement;
        }));
  }

  getItem(ItemTypeID: String): Observable<ItemResponse> {
    return this.http
      .post<any>(`${environment.API_URL}/api/get_item`, { item_type_id: ItemTypeID }, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getLocation(ItemTypeID: Number): Observable<LocationResponse> {
    return this.http
      .post<any>(`${environment.API_URL}/api/get_location_item`, { item_id: ItemTypeID }, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getItemType(): Observable<ItemTypeResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_type`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getLocation2(): Observable<LocationResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_location` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // getItem(ItemTypeID: Number): Observable<ItemResponse> {
  //   return this.http
  //     .post<any>(`${environment.API_URL}/api/get_item`, { item_type_id: ItemTypeID }, this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }

  // getSize(): Observable<SizeResponse> {
  //   return this.http
  //     .get<any>(`${environment.API_URL}/api/get_size` , this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }

  //// Get////


  getById(movementId: number): Observable<Movement> {
    return this.http
      .get<any>(`${environment.API_URL}/item/${movementId}`, this.httpOptions)
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

  approve(movementId: number, status: string): Observable<Movement> {
    return this.http
      .put<Movement>(`${environment.API_URL}/api/appove_report_stock/${movementId}`, { status: status }, this.httpOptions)
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
      errorMessage = `Error ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  new(movement: FormData): Observable<Movement> {
    return this.http
      .post<Movement>(`${environment.API_URL}/api/report_movement_item`, movement, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  getReportById(ItemId: String): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/report_stock/` + ItemId, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  updateTrans(movementId: number, movement: Movement): Observable<Movement> {
    return this.http
      .put<Movement>(`${environment.API_URL}/api/item_trans/${movementId}`, movement, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  
}
