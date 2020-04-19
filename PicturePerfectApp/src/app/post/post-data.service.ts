import { map, tap, delay, catchError } from 'rxjs/operators';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      errorMessage = `'${err.status} ${err.statusText}' when accessing "${err.url}'`;
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
