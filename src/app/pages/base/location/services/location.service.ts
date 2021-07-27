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
import { LocationResponse, Location } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class LocationService {
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


  getAll(dataTablesParameters: any): Observable<LocationResponse> {
    return this.http
      .post<LocationResponse>(`${environment.API_URL}/api/location_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((location: LocationResponse) => {
          return location;
        }));
  }

  getWarehouse(): Observable<LocationResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_warehouse` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }


  getById(locationId: number): Observable<Location> {
    return this.http
      .get<any>(`${environment.API_URL}/api/location/${locationId}`)
      .pipe(catchError(this.handlerError));
  }

  new(location: Location): Observable<Location> {
    console.log(this.httpOptions);
    return this.http
      .post<Location>(`${environment.API_URL}/api/location`, location, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(locationId: number, location: Location): Observable<Location> {
    return this.http
      .patch<Location>(`${environment.API_URL}/api/location/${locationId}`, location, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(locationId: number): Observable<{}> {
    return this.http
      .delete<LocationResponse>(`${environment.API_URL}/api/location/${locationId}`, this.httpOptions)
      .pipe(
        map((location: LocationResponse) => {
          return location;
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

