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
import { RoutingResponse, Routing } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class DialogRoutingService {
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


  // getAll(dataTablesParameters: any): Observable<RoutingResponse> {
  //   return this.http
  //     .post<RoutingResponse>(`${environment.API_URL}/api/routing_page`, dataTablesParameters, this.httpOptions)
  //     .pipe(
  //       map((routing: RoutingResponse) => {
  //         return routing;
  //       }));
  // }



  getById(routingId: number): Observable<RoutingResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/routing/${routingId}`,this.httpOptions)
      .pipe(catchError(this.handlerError));
  }



  update(routingId: number, routing: Routing): Observable<Routing> {
    return this.http
      .put<Routing>(`${environment.API_URL}/api/routing/${routingId}`, routing, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  approve(routingId: number, routing: Routing): Observable<Routing> {
    return this.http
      .put<Routing>(`${environment.API_URL}/api/approve_routing/${routingId}`, routing, this.httpOptions)
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
  new(routing: FormData): Observable<Routing> {
    return this.http
      .post<Routing>(`${environment.API_URL}/api/routing`, routing, this.httpOptions)
      .pipe(catchError(this.handlerError));
}

getRouting(): Observable<RoutingResponse> {
  return this.http
    .get<any>(`${environment.API_URL}/api/get_routing`, this.httpOptions)
    .pipe(catchError(this.handlerError));
}


}
