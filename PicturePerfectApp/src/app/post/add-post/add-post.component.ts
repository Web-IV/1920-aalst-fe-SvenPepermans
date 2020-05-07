import { Post } from './../post.model';
import { Foto } from './../foto.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  public post: FormGroup;
  selectedFile = null;
  @Output() public newPost = new EventEmitter<Post>();
  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.post = this.fb.group({
      beschrijving: [
        '' , [Validators.required, Validators.minLength(10) ]     
      ],
      categorie: ['', [Validators.required]], 
      fotos: this.fb.array([ this.createFotos() ])
      
    });
  }

  onSubmit() {
    let fotos = this.post.value.fotos.map(Foto.fromJSON);
    this.newPost.emit(new Post(this.post.value.beschrijving, fotos, this.post.value.categorie));

    this.post = this.fb.group({
      beschrijving: ['', [Validators.required, Validators.minLength(10)]],
      categorie: ['', [Validators.required]],
      fotos: this.fb.array([this.createFotos()])

    })
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} charactes (got ${errors.minlength.actualLength})`;
    }
  }

  createFotos(): FormGroup{
    return this.fb.group({
      foto: ['']
    })
  }
}
