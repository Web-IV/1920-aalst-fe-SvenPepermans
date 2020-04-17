import { POSTS } from './../mock-posts';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostDataService } from '../post-data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  constructor(private _postDataService: PostDataService) {}
  public filterPostBeschrijving: string;

  applyFilter(filter: string) {
    this.filterPostBeschrijving = filter;
  }

  ngOnInit(): void {}
  get posts() {
    return this._postDataService.posts;
  }
  addNewPost(post: Post) {
    this._postDataService.addNewPost(post);
  }
}
