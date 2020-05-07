import { PostDataService } from './../post-data.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Subject, Observable, EMPTY } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  map,
  filter,
  catchError
} from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  private _posts: Post[];
  private _fetchPosts$: Observable<Post[]>;
  public errorMessage: string = '';
  public filterPostBeschrijving: string;
  public filterPost$ = new Subject<string>();

  constructor(private _postDataService: PostDataService) {
    this._postDataService.posts$.subscribe(pos => (this._posts = pos));
    this.filterPost$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase()),
        filter(val => !val.startsWith('s'))
      )
      .subscribe(val => (this.filterPostBeschrijving = val));
  }
  get posts(): Post[] {
    return this._posts;
  }

  applyFilter(filter: string) {
    this.filterPostBeschrijving = filter;
  }

  ngOnInit(): void {
    this._fetchPosts$ = this._postDataService.posts$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }
  get posts$(): Observable<Post[]> {
    return this._fetchPosts$;
  }
}
