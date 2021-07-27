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
import { VendorResponse, Vendor } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class VendorService {
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

  getAll(dataTablesParameters: any): Observable<VendorResponse> {
    return this.http
      .post<VendorResponse>(`${environment.API_URL}/api/vendor_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((vendor: VendorResponse) => {
          return vendor;
        }));
  }

  // getById(vendorId: number): Observable<Vendor> {
  //   return this.http
  //     .get<any>(`${environment.API_URL}/api/size/${vendorId}`)
  //     .pipe(catchError(this.handlerError));
  // }

  new(vendor: Vendor): Observable<Vendor> {
    console.log(this.httpOptions);
    return this.http
      .post<Vendor>(`${environment.API_URL}/api/vendor`, vendor, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(vendorId: number, vendor: Vendor): Observable<Vendor> {
    return this.http
      .patch<Vendor>(`${environment.API_URL}/api/vendor/${vendorId}`, vendor, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(vendorId: number): Observable<{}> {
    return this.http
      .delete<VendorResponse>(`${environment.API_URL}/api/vendor/${vendorId}`, this.httpOptions)
      .pipe(
        map((vendor: VendorResponse) => {
          return vendor;
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
