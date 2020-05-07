import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
  } from '@angular/router';
  import { Post } from './post.model';
  import { Injectable } from '@angular/core';
  import { PostDataService } from './post-data.service';
  import { Observable } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class PostResolver implements Resolve<Post> {
    constructor(private postService: PostDataService) {}
  
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<Post> {
      return this.postService.getPost$(route.params['id']);
    }
  }