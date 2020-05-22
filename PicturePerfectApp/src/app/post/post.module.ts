import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PostFilterPipe } from './post-filter.pipe';
import { MaterialModule } from './../material/material.module';
import { PostComponent } from './post/post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostResolver } from './PostResolver';
import { EditPostComponent } from './edit-post/edit-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPostsResolver } from './UserPostsResolver';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const postRoutes: Routes = [
  { path: 'home', component: PostListComponent },
  { path: 'add', component: AddPostComponent },
  {
    path: 'detail/:id',
    component: PostDetailComponent,
    resolve: { post: PostResolver }
  },
  {
    path: 'gebruiker/:gebruikersNaam',
    component: UserProfileComponent,
    resolve: {userPosts: UserPostsResolver}
  },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    resolve: { post: PostResolver }
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    AddPostComponent,
    PostFilterPipe,
    PostDetailComponent,
    EditPostComponent,
    ProfileComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(postRoutes)
  ],
  exports: [AddPostComponent, PostListComponent, ProfileComponent]
})
export class PostModule {}
