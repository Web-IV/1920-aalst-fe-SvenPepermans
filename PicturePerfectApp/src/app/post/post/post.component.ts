import { PostDataService } from './../post-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserDataService } from '../../user/user-data.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() public post: Post;
 images: any[];
  loggedInUser$ = this._userDataService.getCurrentUser$();
  constructor(
    private sanitizer: DomSanitizer,
    private _postDataService: PostDataService,
    private _userDataService: UserDataService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    console.log(this.post);
    this.images = this.post.fotos.map(foto => foto.base64);
    console.log(this.images[0]);
  
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
