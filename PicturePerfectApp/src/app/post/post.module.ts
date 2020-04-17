import { MaterialModule } from './../material/material.module';
import { PostComponent } from './post/post.component';
import { FotoComponent } from './foto/foto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';

@NgModule({
  declarations: [PostComponent, FotoComponent, PostListComponent, AddPostComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PostListComponent]
})
export class PostModule {}
