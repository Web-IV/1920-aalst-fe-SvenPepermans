import { AuthenticationService } from './../../user/authentication.service';
import { environment } from 'src/environments/environment';
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
import { UserDataService } from '../../user/user-data.service';
import { User } from '../../user/user.model';
import { Observable } from 'rxjs';

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
  public auth: AuthenticationService;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _postDataService: PostDataService,
    private _userDataService: UserDataService
  ) {}

  get fotos(): FormArray {
    return <FormArray>this.post.get('fotos');
  }

  ngOnInit(): void {
    this.post = this.fb.group({
      beschrijving: ['', [Validators.required, Validators.minLength(2)]],
      categorieNaam: ['', [Validators.required]],
      fotos: this.fb.array([this.createFotos()])
    });
    //this.fotos.valueChanges.pipe(distinctUntilChanged()).subscribe(fList => {
    // this.fotos.push(this.createFotos());
    //});
  }

  onSubmit() {
    this._userDataService.getCurrentUser$().subscribe(user => {
      this._postDataService.addNewPost(
        new Post(
          user,
          this.post.value.beschrijving,
          this.post.value.categorieNaam
        )
      );
      this.post = this.fb.group({
        beschrijving: ['', [Validators.required, Validators.minLength(2)]],
        categorieNaam: ['', [Validators.required]]
        //fotos: this.fb.array([this.createFotos()])
      });
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
    this.returnData = this.fb.group({
      name: [''],
      url: ['']
    });
    return this.returnData;
  }

  uploadFotos(files: any): void {
    ///////File uploaden naar DB////////
    // if(this.post.valid){
    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.http
      .post(`${environment.apiUrl}/foto/`, formData, {
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
    //}
  }
}
