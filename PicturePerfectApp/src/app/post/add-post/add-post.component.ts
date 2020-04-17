import { Post } from './../post.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  @Output() public newPost = new EventEmitter<Post>();
  constructor() {}

  ngOnInit(): void {}

  addPost(postBeschrijving: HTMLInputElement): boolean {
    const post = new Post(postBeschrijving.value, []);
    this.newPost.emit(post);
    return false;
  }
}
