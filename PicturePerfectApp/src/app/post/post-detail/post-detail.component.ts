import { PostDataService } from '../post-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  constructor(
    private route: ActivatedRoute,
    private postDataService: PostDataService
  ) {}

  ngOnInit(): void {
  this.route.data.subscribe(item => this.post = item['post'])
  }
}
