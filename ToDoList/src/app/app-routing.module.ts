import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main-window',
    loadChildren: () => import(`./main-window/main-window.module`).then(m => m.MainWindowModule)
  },
  {
    path: '',
    redirectTo: 'main-window',
    pathMatch: "full"
  },
  {
    path: '**',
    redirectTo: 'main-window',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
