import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'sections', 
    loadChildren: () => import('./modules/sections/sections.module').then(m => m.SectionsModule) 
  },
  { 
    path: 'tasks', 
    loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule) 
  },
  { 
    path: '', 
    redirectTo: 'sections', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'sections' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
