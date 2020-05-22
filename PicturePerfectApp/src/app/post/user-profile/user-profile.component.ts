import { PostDataService } from './../post-data.service';
import { Observable, EMPTY } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Post } from './../post.model';
import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user.model';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  public posts: Post[];
  public errorMessage: string = '';
  private _fetchPosts$: Observable<Post[]>;
  constructor(
    private route: ActivatedRoute,
    private postDataService: PostDataService
  ) {
    this._fetchPosts$ = this.route.queryParams
      .pipe(
        switchMap(newParams => {
          return this.postDataService.getPostsFromUser$(this.user);
        })
      )
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
  }

  ngOnInit(): void {
    this.route.data.subscribe(item => (this.user = item['userPosts']));
    console.log(this.user);
  }

  get posts$(): Observable<Post[]> {
    return this._fetchPosts$;
  }
}
