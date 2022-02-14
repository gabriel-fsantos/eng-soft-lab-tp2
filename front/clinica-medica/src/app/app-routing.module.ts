import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageGeralComponent } from './page-geral/page-geral.component';

const routes: Routes = [
  {
    path: '',
    component: PageGeralComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
