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
import { DocResponse, Doc } from '@app/shared/models/base.interface';
import { User, UserResponse } from '@app/shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class DocService {
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


  getAll(dataTablesParameters: any): Observable<DocResponse> {
    return this.http
      .post<DocResponse>(`${environment.API_URL}/api/doc_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((doc: DocResponse) => {
          return doc;
        }));
  }

  getById(docId: number): Observable<Doc> {
    return this.http
      .get<any>(`${environment.API_URL}/api/doc/${docId}`)
      .pipe(catchError(this.handlerError));
  }

  new(doc: Doc): Observable<Doc> {
    console.log(this.httpOptions);
    return this.http
      .post<Doc>(`${environment.API_URL}/api/doc`, doc, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(docId: number, doc: Doc): Observable<Doc> {
    return this.http
      .patch<Doc>(`${environment.API_URL}/api/doc/${docId}`, doc, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(docId: number): Observable<{}> {
    return this.http
      .delete<DocResponse>(`${environment.API_URL}/api/doc/${docId}`, this.httpOptions)
      .pipe(
        map((doc: DocResponse) => {
          return doc;
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

  getUser(): Observable<UserResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/get_user` , this.httpOptions)
      .pipe(catchError(this.handlerError));
  }
}
