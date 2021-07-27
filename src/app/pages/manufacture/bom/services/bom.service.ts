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
import { BomResponse, Bom, ItemResponse, ItemTypeResponse, LocationResponse, BomTree } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class BomService {
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



  getBomTree(bom_id): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_bom_tree/${bom_id}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  //// Get////
  getAll(dataTablesParameters: any): Observable<BomResponse> {
    return this.http
      .post<BomResponse>(`${environment.API_URL}/api/bom_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((bom: BomResponse) => {
          return bom;
        }));
  }

  getItem(ItemTypeID: String): Observable<ItemResponse> {
    return this.http
      .post<any>(`${environment.API_URL}/api/get_item`, { item_type_id: ItemTypeID }, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getById(bomId: number): Observable<BomResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/bom/${bomId}`, this.httpOptions)
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



  getReportById(ItemId: String): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/report_stock/` + ItemId, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(bomId: number, bom: String): Observable<Bom> {
    return this.http
      .put<Bom>(`${environment.API_URL}/api/bom/${bomId}`, bom, this.httpOptions)
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
  new(bom: FormData): Observable<Bom> {
    return this.http
      .post<Bom>(`${environment.API_URL}/api/bom`, bom, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  addByLine(bom: FormData): Observable<Bom> {
    return this.http
      .post<Bom>(`${environment.API_URL}/api/bom_line`, bom, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  cloneBom(bom: FormData): Observable<Bom> {
    return this.http
      .post<Bom>(`${environment.API_URL}/api/clone_bom`, bom, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  editByLine(bomLineId,bom: FormData): Observable<Bom> {
    return this.http
      .put<Bom>(`${environment.API_URL}/api/bom_line/${bomLineId}`, bom, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getApprove(bomId: String): Observable<ItemResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/report_stock/` + bomId, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  approve(bomId: number, status: string): Observable<BomResponse> {
    return this.http
      .put<BomResponse>(`${environment.API_URL}/api/approve_bom/${bomId}`, { status: status }, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(bomId: number): Observable<BomResponse> {
    return this.http
      .delete<BomResponse>(`${environment.API_URL}/api/bom/${bomId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  deleteBomLine(bomLine) {
    return this.http
      .post<BomResponse>(`${environment.API_URL}/api/delete_bom_line`, { bom_line_id: bomLine }, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }



}
