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
import { CustomerResponse, Customer } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
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

  getAll(dataTablesParameters: any): Observable<CustomerResponse> {
    return this.http
      .post<CustomerResponse>(`${environment.API_URL}/api/customer_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((customer: CustomerResponse) => {
          return customer;
        }));
  }

  new(customer: Customer): Observable<Customer> {
    console.log(this.httpOptions);
    return this.http
      .post<Customer>(`${environment.API_URL}/api/customer`, customer, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(customerId: number, customer: Customer): Observable<Customer> {
    return this.http
      .patch<Customer>(`${environment.API_URL}/api/customer/${customerId}`, customer, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(customerId: number): Observable<{}> {
    return this.http
      .delete<CustomerResponse>(`${environment.API_URL}/api/customer/${customerId}`, this.httpOptions)
      .pipe(
        map((customer: CustomerResponse) => {
          return customer;
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
