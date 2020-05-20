import { UserDataService } from './../../user/user-data.service';
import { PostDataService } from './../post-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from './../post.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  public post: Post;
  public edit: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _postDataService: PostDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(item => (this.post = item['post']));
    console.log(this.post);
    this.edit = this.fb.group({
      beschrijving: [
        this.post.beschrijving,
        [Validators.required, Validators.minLength(2)]
      ],
      categorieNaam: [this.post.categorieNaam, [Validators.required]]
    });
  }
  onSubmit() {
    this.post.setBeschrijving(this.edit.value.beschrijving);
    this.post.setCategorieNaam(this.edit.value.categorieNaam);
    this.post.setFotos([]);
    console.log(this.post);
    this._postDataService.editPost(this.post);
    this.router.navigate(['/post/home']);
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} charactes (got ${errors.minlength.actualLength})`;
    }
  }

  
}
