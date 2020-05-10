import { AuthGuard } from './user/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'post',
    canActivate: [AuthGuard],
    loadChildren: () => import('./post/post.module').then(mod => mod.PostModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
