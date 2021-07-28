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
import { Benefit, BenefitResponse, Disease, DiseaseResponse,ServiceGroupResponse} from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class BenefitService {
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

  getAll(dataTablesParameters: any): Observable<BenefitResponse> {
    return this.http
      .post<BenefitResponse>(`${environment.API_URL}/api/service_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((benefit: BenefitResponse) => {
          return benefit;
        }));
  }


  delete(benefitId: number): Observable<{}> {
    return this.http
      .delete<Benefit>(`${environment.API_URL}/api/service/${benefitId}`, this.httpOptions)
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

  get_service(): Observable<ServiceGroupResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/service`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(benefit: FormData): Observable<Benefit> {
    return this.http
      .post<Benefit>(`${environment.API_URL}/api/service`, benefit, this.httpOptions)
      .pipe(catchError(this.handlerError));
}

getById(benefitId: number): Observable<BenefitResponse> {
  return this.http
    .get<any>(`${environment.API_URL}/api/service/${benefitId}`, this.httpOptions)
    .pipe(catchError(this.handlerError));
}
update(benefitId: number,benefit: Benefit): Observable<Benefit> {
  return this.http
    .patch<Benefit>(`${environment.API_URL}/api/service/${benefitId}`, benefit, this.httpOptions)
    .pipe(catchError(this.handlerError));
}

}
