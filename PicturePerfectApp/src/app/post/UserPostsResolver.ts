import { catchError, switchMap } from 'rxjs/operators';
import { Post } from './post.model';
import { UserDataService } from './../user/user-data.service';
import { PostDataService } from './post-data.service';
import { User } from './../user/user.model';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} 
from '@angular/router';
import { Observable, pipe, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPostsResolver implements Resolve<User> {
    
  constructor(private userDataService: UserDataService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> 
  {
    return this.userDataService.getUserWithUserName(route.params['gebruikersNaam']);


  }
}
