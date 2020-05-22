import { UserDataService } from './../../user/user-data.service';
import { PostDataService } from './../post-data.service';
import { Post } from './../post.model';
import { switchMap, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private _fetchPosts$: Observable<Post[]>;
  public errorMessage: string = '';
  public _user: User;

  constructor(
    private _postDataService: PostDataService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userDataService: UserDataService
  ) {
    this._userDataService.getCurrentUser$().subscribe(user => {
      this._fetchPosts$ = this._route.queryParams
        .pipe(
          switchMap(newParams => {
            return this._postDataService.getPostsFromUser$(user);
          })
        )
        .pipe(
          catchError(err => {
            this.errorMessage = err;
            return EMPTY;
          })
        );
    });
  }

  ngOnInit(): void {}

  get posts$(): Observable<Post[]> {
    return this._fetchPosts$;
  }
}
