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
import { ItemTypeResponse, ItemType } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {
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

  // getAll(): Observable<BranchResponse> {
  //   return this.http
  //     .get<BranchResponse>(`${environment.API_URL}/api/branch`, this.httpOptions)
  //     .pipe(
  //       map((branch: BranchResponse) => {
  //         return branch;
  //       }));
  // }

  getAll(dataTablesParameters: any): Observable<ItemTypeResponse> {
    return this.http
      .post<ItemTypeResponse>(`${environment.API_URL}/api/item_type_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((itemtype: ItemTypeResponse) => {
          return itemtype;
        }));
  }

  getById(itemtypeId: number): Observable<ItemType> {
    return this.http
      .get<any>(`${environment.API_URL}/api/item_type/${itemtypeId}`)
      .pipe(catchError(this.handlerError));
  }

  new(itemtype: ItemType): Observable<ItemType> {
    console.log(this.httpOptions);
    return this.http
      .post<ItemType>(`${environment.API_URL}/api/item_type`, itemtype, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(itemtypeId: number, itemtype: ItemType): Observable<ItemType> {
    return this.http
      .patch<ItemType>(`${environment.API_URL}/api/item_type/${itemtypeId}`, itemtype, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(itemtypeId: number): Observable<{}> {
    return this.http
      .delete<ItemTypeResponse>(`${environment.API_URL}/api/item_type/${itemtypeId}`, this.httpOptions)
      .pipe(
        map((itemtype: ItemTypeResponse) => {
          return itemtype;
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
