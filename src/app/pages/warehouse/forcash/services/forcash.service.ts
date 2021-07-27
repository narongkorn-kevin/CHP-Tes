import {
  Forcash,
  ForcashResponse,
} from './../../../../shared/models/base.interface';
import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  DepositResponse,
  Deposit,
  ItemResponse,
  LocationResponse,
  ItemTypeResponse,
} from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root',
})
export class ForcashService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ Authorization: `Bearer ${user.token}` }),
  };

  httpOptionsFormdata = {
    headers: new HttpHeaders({ Authorization: `Bearer ${user.token}` }),
  };

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request));
  }

  addToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const requestWithHeader = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${user.token}`),
    });
    return requestWithHeader;
  }

  //// Get////
  getAll(dataTablesParameters: any): Observable<ForcashResponse> {
    return this.http
      .post<ForcashResponse>(
        `${environment.API_URL}/api/forcash_page`,
        dataTablesParameters,
        this.httpOptions
      )
      .pipe(
        map((forcash: ForcashResponse) => {
          return forcash;
        })
      );
  }

  getItem(ItemTypeID: String): Observable<ItemResponse> {
    return this.http
      .post<any>(
        `${environment.API_URL}/api/forcash`,
        { item_type_id: ItemTypeID },
        this.httpOptions
      )
      .pipe(catchError(this.handlerError));
  }

  getLocation(): Observable<LocationResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_location`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getItemType(): Observable<ItemTypeResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_type`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // getSize(): Observable<SizeResponse> {
  //   return this.http
  //     .get<any>(`${environment.API_URL}/api/get_size` , this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }

  //// Get////

  getById(forcashId: number): Observable<Forcash> {
    return this.http
      .get<any>(`${environment.API_URL}/item/${forcashId}`, this.httpOptions)
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

  update(forcashId: number, forcash: Forcash): Observable<Forcash> {
    return this.http
      .put<Forcash>(
        `${environment.API_URL}/api/appove_report_stock/${forcashId}`,
        forcash,
        this.httpOptions
      )
      .pipe(catchError(this.handlerError));
  }

  approve(forcashId: number, forcash: Forcash): Observable<Forcash> {
    return this.http
      .put<Forcash>(
        `${environment.API_URL}/api/approve_forcash/${forcashId}`,
        forcash,
        this.httpOptions
      )
      .pipe(catchError(this.handlerError));
  }

  delete(forcashId: number): Observable<{}> {
    return this.http
      .delete<Forcash>(
        `${environment.API_URL}/api/forcash/${forcashId}`,
        this.httpOptions
      )
      .pipe(
        map((forcash: ForcashResponse) => {
          return forcash;
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
  new(forcash: FormData): Observable<Forcash> {
    return this.http
      .post<Forcash>(
        `${environment.API_URL}/api/forcash`,
        forcash,
        this.httpOptionsFormdata
      )
      .pipe(catchError(this.handlerError));
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
