import { Router, ActivatedRoute } from '@angular/router';
import { PostFilterPipe } from './../post-filter.pipe';
import { PostDataService } from './../post-data.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Subject, Observable, EMPTY } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  map,
  filter,
  catchError,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  private _fetchPosts$: Observable<Post[]>;
  public errorMessage: string = '';
  public filterPostBeschrijving: string = '';
  public filterPost$ = new Subject<string>();

  constructor(
    private _postDataService: PostDataService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.filterPost$
      .pipe(
        distinctUntilChanged(),
        debounceTime(250)
      )
      .subscribe(val => {
        const params = val ? { queryParams: { filter: val } } : undefined;
        this._router.navigate(['/posts/home'], params);
      });

    this._fetchPosts$ = this._route.queryParams
      .pipe(
        switchMap(newParams => {
          if (newParams['filter']) {
            this.filterPostBeschrijving = newParams['filter'];
          }
          return this._postDataService.getPosts$(newParams['filter']);
        })
      )
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
  }

  applyFilter(filter: string) {
    this.filterPostBeschrijving = filter;
  }

  ngOnInit(): void {}

  get posts$(): Observable<Post[]> {
    return this._fetchPosts$;
  }
}
