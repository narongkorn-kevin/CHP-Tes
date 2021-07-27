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
import { ItemResponse, Item, ItemTypeResponse, SizeResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class ItemService {
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

//// Get////
  getAll(dataTablesParameters: any): Observable<ItemResponse> {
    return this.http
      .post<ItemResponse>(`${environment.API_URL}/api/item_page` , dataTablesParameters, this.httpOptions)
      .pipe(
        map((Item: ItemResponse) => {
          return Item;
        }));
  }


  getItemType(): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_item_type` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getMaterialType(): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_material_type` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  getMaterialColor(): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_material_color` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  getMaterialGrade(): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_material_grade` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  getMaterialManuFactu(): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_material_manufactu` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  getLocation(): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_location` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getSpareType(): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_spare_type` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  getUnit(): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_unit` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getSize(): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_size` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }


//// Get////


  getById(itemId: number): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/item/${itemId}` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(item: FormData): Observable<Item> {
    return this.http
      .post<Item>(`${environment.API_URL}/api/item`, item, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }
  Import(item: FormData): Observable<Item> {
    return this.http
      .post<Item>(`${environment.API_URL}/api/import_item`, item, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }

    update(itemId: number, item: FormData): Observable<Item> {
    return this.http
      .post<Item>(`${environment.API_URL}/api/update_item`, item, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }

  delete(itemId: number): Observable<{}> {
    return this.http
      .delete<Item>(`${environment.API_URL}/api/item/${itemId}`, this.httpOptions)
      .pipe(
        map((position: ItemResponse) => {
          return position;
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
