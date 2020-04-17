import { POSTS } from './../mock-posts';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  private _posts = POSTS;
  constructor() {}

  ngOnInit(): void {}
  get posts() {
    return this._posts;
  }
  addNewPost(post: Post) {
    this._posts.push(post);
  }
}
