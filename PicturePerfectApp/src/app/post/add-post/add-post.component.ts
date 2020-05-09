import { Foto } from './../foto.model';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { Post } from './../post.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';
import { PostDataService } from '../post-data.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  public post: FormGroup;
  public progress: number;
  public message: string;
  public returnData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _postDataService: PostDataService
  ) {}

  get fotos(): FormArray {
    return <FormArray>this.post.get('fotos');
  }

  ngOnInit(): void {
    this.post = this.fb.group({
      beschrijving: ['', [Validators.required, Validators.minLength(2)]],
      categorie: ['', [Validators.required]],
      fotos: this.fb.array([this.createFotos()])
    });

    this.fotos.valueChanges.pipe(distinctUntilChanged()).subscribe(fList => {
      this.fotos.push(this.createFotos());
    });
  }

  onSubmit() {
    let fotos = this.post.value.fotos.map(Foto.fromJSON);
    this._postDataService.addNewPost(
      new Post(this.post.value.beschrijving, this.post.value.categorie, fotos)
    );
    this.post = this.fb.group({
      beschrijving: ['', [Validators.required, Validators.minLength(2)]],
      categorie: ['', [Validators.required]],
      fotos: this.fb.array([this.createFotos()])
    });
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} charactes (got ${errors.minlength.actualLength})`;
    }
  }

  createFotos(): FormGroup {
    //////////Foto omzetten naar klasse//////////
    return this.returnData;
  }

  uploadFotos(files: any): void {
    ///////File uploaden naar DB////////
    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      this.returnData = this.fb.group({
        name: [file.name],
        url: ['een url']
      });
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
  }
}
