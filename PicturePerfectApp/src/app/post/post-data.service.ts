import { map, tap, delay, catchError, switchMap } from 'rxjs/operators';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foto } from './foto.model';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  private _reloadPosts$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  //get allPosts$(): Observable<Post[]> { return this._posts$;}

  getPosts$(beschrijving?: string, categorieNaam?: string) {
    return this._reloadPosts$.pipe(
      switchMap(() => this.fetchRecipes$(beschrijving, categorieNaam))
    );
  }

  fetchRecipes$(beschrijving?: string, categorieNaam?: string) {
    let params = new HttpParams();
    params = beschrijving
      ? params.append('beschrijving', beschrijving)
      : params;
    params = categorieNaam
      ? params.append('categorieNaam', categorieNaam)
      : params;
    return this.http.get(`${environment.apiUrl}/posts/`, { params }).pipe(
      catchError(this.handleError),
      map((list: any[]): Post[] => list.map(Post.fromJSON))
    );
  }

  get posts$(): Observable<Post[]> {
    return this.http.get(`${environment.apiUrl}/posts/`).pipe(
      catchError(this.handleError),
      map((list: any[]): Post[] => list.map(Post.fromJSON))
    );
  }

  getPost$(id: string): Observable<Post> {
    return this.http.get(`${environment.apiUrl}/posts/${id}`).pipe(
      catchError(this.handleError),
      map(Post.fromJSON)
    );
  }

  getFoto$(id: string): Observable<Foto> {
    return this.http.get(`${environment.apiUrl}/fotos/${id}`).pipe(
      catchError(this.handleError),
      map(Foto.fromJSON)
    );
  }
  deletePost(post: Post) {
    return this.http
      .delete(`${environment.apiUrl}/posts/${post.PostId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )
      .subscribe(() => {
        this._reloadPosts$.next(true);
      });
  }

  editPost(post: Post) {
    return this.http
      .put(`${environment.apiUrl}/posts/${post.PostId}`, post)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )
      .subscribe(() => {
        this._reloadPosts$.next(true);
      });
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

  addNewPost(post: Post) {
    console.log(post);
    return this.http
      .post(`${environment.apiUrl}/posts/`, post.toJSON())
      .pipe(
        catchError(this.handleError),
        map(Post.fromJSON)
      )
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        tap((pos: Post) => {
          this._reloadPosts$.next(true);
        })
      );
  }
}
