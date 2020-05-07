import { HttpClient, HttpEventType } from '@angular/common/http';

import { Post } from './../post.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { PostDataService } from '../post-data.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  public post: FormGroup;
  public progress: number;
  public message: string;

  

  @Output() public newPost = new EventEmitter<Post>();

  constructor(private fb: FormBuilder, private http: HttpClient, private _postDataService : PostDataService) {}

  ngOnInit(): void {
    this.post = this.fb.group({
      beschrijving: ['', [Validators.required, Validators.minLength(10)]],
      categorie: ['', [Validators.required]]
    });
  }
  public uploadFile = files => {
    if (files.length === 0) {
      return;
    }

    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.http
      .post('https://localhost:5001/api/Foto', formData, {
        reportProgress: true,
        observe: 'events'
      })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
         
        }
      });
  };

  onSubmit() {
    this.post = this.fb.group({
      beschrijving: ['', [Validators.required, Validators.minLength(10)]],
      categorie: ['', [Validators.required]]
    });
    this._postDataService.addNewPost(
      new Post(this.post.value.beschrijving, this.post.value.categorie)
    );
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} charactes (got ${errors.minlength.actualLength})`;
    }
  }
}
