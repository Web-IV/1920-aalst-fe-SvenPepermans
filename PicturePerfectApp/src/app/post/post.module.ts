import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PostFilterPipe } from './post-filter.pipe';
import { MaterialModule } from './../material/material.module';
import { PostComponent } from './post/post.component';
import { FotoComponent } from './foto/foto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { HttpClientModule } from '@angular/common/http';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostResolver } from './PostResolver';

const routes: Routes = [
  { path: 'post/all', component: PostListComponent },
  { path: 'post/add', component: AddPostComponent },
  {
    path: 'post/detail/:id',
    component: PostDetailComponent,
    resolve: { post: PostResolver }
  }
];

@NgModule({
  declarations: [
    PostComponent,
    FotoComponent,
    PostListComponent,
    AddPostComponent,
    PostFilterPipe,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [AddPostComponent, PostListComponent]
})
export class PostModule {}
