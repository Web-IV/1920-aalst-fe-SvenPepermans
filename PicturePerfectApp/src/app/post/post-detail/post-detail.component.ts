import { Post } from './../post.model';
import { PostDataService } from './../post-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
public post: Post;
  constructor(private route: ActivatedRoute, private PostDataService: PostDataService) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => (this.post = item['post']));
    }

}
