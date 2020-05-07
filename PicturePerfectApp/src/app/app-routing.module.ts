import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './post/add-post/add-post.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { PostListComponent} from './post/post-list/post-list.component';


const appRoutes: Routes = [   
{ path: '', redirectTo: 'post/all', pathMatch: 'full'},
{ path: '**', component: PageNotFoundComponent} ];

@NgModule({
  declarations: [],
  imports: [
   CommonModule, RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
