import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getCurrentUser$(): Observable<User> {
    return this.http.get(`${environment.apiUrl}/gebruiker/`).pipe(
      catchError(this.handleError),
      map(User.fromJSON)
    );
  }

  getUser$(id: string): Observable<User> {
    return this.http.get(`${environment.apiUrl}/gebruiker/${id}`).pipe(
      catchError(this.handleError),
      map(User.fromJSON)
    );
  }

  getUsers$(): Observable<User[]>{
    return this.http.get(`${environment.apiUrl}/gebruiker/gebruikers`).pipe(
      catchError(this.handleError),
      map((list: any[]): User[] => list.map(User.fromJSON))
    );
  }

  getUserWithUserName(gebruikersNaam: string): Observable<User>{
    return this.http.get(`${environment.apiUrl}/gebruiker/name/${gebruikersNaam}`).pipe(
      catchError(this.handleError),
      map(User.fromJSON)
    );
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      errorMessage = `'${err.status} ${err.statusText}' when accessing "${err.url}"`;
    } else {
      errorMessage = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
