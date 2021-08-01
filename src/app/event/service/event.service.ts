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
import { Benefit, BenefitResponse, Disease, DiseaseResponse,ServiceGroupResponse, EventResponse, Event} from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class EventService {
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
  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // //// Get////

  getDisease(): Observable<DiseaseResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/disease`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getAll(dataTablesParameters: any): Observable<EventResponse> {
    return this.http
      .post<EventResponse>(`${environment.API_URL}/api/event_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((event: EventResponse) => {
          return event;
        }));
  }


  delete(eventId: number): Observable<{}> {
    return this.http
      .delete<Benefit>(`${environment.API_URL}/api/event/${eventId}`, this.httpOptions)
      .pipe(
        map((benefit: BenefitResponse) => {
          return benefit;
        }),
        catchError((err) => this.handlerError(err))
      );


  }

  get_service_group(): Observable<ServiceGroupResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/service_group`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getSequence(): Observable<ServiceGroupResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/sequence`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  get_service(): Observable<ServiceGroupResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/service`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
  get_event(): Observable<EventResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/event`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(event: FormData): Observable<Event> {
    return this.http
      .post<Event>(`${environment.API_URL}/api/event`, event, this.httpOptions)
      .pipe(catchError(this.handlerError));
}

getById(eventId: number): Observable<BenefitResponse> {
  return this.http
    .get<any>(`${environment.API_URL}/api/event/${eventId}`, this.httpOptions)
    .pipe(catchError(this.handlerError));
    
}
update(eventId: number,benefit: Benefit): Observable<Event> {
  return this.http
    .patch<Event>(`${environment.API_URL}/api/event/${eventId}`, benefit, this.httpOptions)
    .pipe(catchError(this.handlerError));
}

}
