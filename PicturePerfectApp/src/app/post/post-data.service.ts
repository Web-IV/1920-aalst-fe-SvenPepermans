import { map, tap, delay, catchError } from 'rxjs/operators';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foto } from './foto.model';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  private _posts$ = new BehaviorSubject<Post[]>([]);
  private _posts: Post[];

  constructor(private http: HttpClient) {
    this.posts$.subscribe((posts: Post[]) => {
      this._posts = posts;
      this._posts$.next(this._posts);
    });
  }

  get allPosts$(): Observable<Post[]> {
    return this._posts$;
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

  getFoto$(id: string): Observable<Foto>{
    return this.http.get(`${environment.apiUrl}/fotos/${id}`).pipe(
      catchError(this.handleError),
      map(Foto.fromJSON)
    );
  }
  deletePost(post: Post){
    return this.http
    .delete(`${environment.apiUrl}/posts/${post.id}`)
    .pipe(tap(console.log), catchError(this.handleError))
    .subscribe(() => {
      this._posts = this._posts.filter(pos => pos.id != post.id);
      this._posts$.next(this._posts);
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
    return this.http
      .post(`${environment.apiUrl}/posts/`, post.toJSON())
      .pipe(
        catchError(this.handleError),
        map(Post.fromJSON)
      )
      .subscribe((pos: Post) => {
        this._posts = [...this._posts, pos];
        this._posts$.next(this._posts);
      });
  }
}
