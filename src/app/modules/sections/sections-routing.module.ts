import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionListComponent } from './section-list/section-list.component';
import { SectionAddComponent } from './section-add/section-add.component';
import { SectionEditComponent } from './section-edit/section-edit.component';

const routes: Routes = [
  { path: '', component: SectionListComponent },
  { path: 'section-form', component: SectionAddComponent },
  // { path: 'sections/:id', component: SectionAddComponent }
  { path: 'section-form/:id', component: SectionAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule { }
