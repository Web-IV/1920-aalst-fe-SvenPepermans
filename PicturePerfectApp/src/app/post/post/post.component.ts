import { PostDataService } from './../post-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() public post: Post;
  constructor(
    private sanitizer: DomSanitizer,
    private _postDataService: PostDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.post);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  deletePost() {
    this._postDataService.deletePost(this.post);
  }
  redirect(pagename: string) {
    console.log(this.post);
    this.router.navigate(['/post/' + pagename + '/' + this.post.PostId]);
  }
}
