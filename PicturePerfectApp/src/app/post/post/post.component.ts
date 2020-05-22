import { map } from 'rxjs/operators';
import { PostDataService } from './../post-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserDataService } from '../../user/user-data.service';
import { User } from '../../user/user.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() public post: Post;
  likeButtonDisabled: boolean = false;
  currentUserId: number;
  images: any[];
  
  constructor(
    private sanitizer: DomSanitizer,
    private _postDataService: PostDataService,
    private _userDataService: UserDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.post);
    this.images = this.post.fotos.map(foto => foto.base64);
    
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

  like() {
    this.post.setLikes(1);
    console.log(this.post);
    this.likeButtonDisabled = true;
    this._postDataService.editPost(this.post);
  }

  compareUsers(): boolean{
    var returnvalue;
    this._userDataService.getCurrentUser$().pipe(
      map(user => this.currentUserId = user.gebruikersId))
      
    
    returnvalue = this.currentUserId == this.post.gebruiker.gebruikersId ;
 
  console.log(returnvalue)
  return returnvalue;
  }
}
