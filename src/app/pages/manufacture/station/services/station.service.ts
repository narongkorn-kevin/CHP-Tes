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
import { StationResponse, Station } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class StationService {
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


  getAll(dataTablesParameters: any): Observable<StationResponse> {
    return this.http
      .post<StationResponse>(`${environment.API_URL}/api/station_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((station: StationResponse) => {
          return station;
        }));
  }

  getById(stationId: number): Observable<StationResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/station/${stationId}`)
      .pipe(catchError(this.handlerError));
  }

  new(station: Station): Observable<Station> {
    console.log(this.httpOptions);
    return this.http
      .post<Station>(`${environment.API_URL}/api/station`, station, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(stationId: number, station: Station): Observable<Station> {
    return this.http
      .patch<Station>(`${environment.API_URL}/api/station/${stationId}`, station, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(stationId: number): Observable<{}> {
    return this.http
      .delete<StationResponse>(`${environment.API_URL}/api/station/${stationId}`, this.httpOptions)
      .pipe(
        map((station: StationResponse) => {
          return station;
        }),
        catchError((err) => this.handlerError(err))
        );
  }

  getReportById(stationId: String): Observable<StationResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/station/` + stationId, this.httpOptions)
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
}
