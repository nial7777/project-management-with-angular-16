import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsRoutingModule } from './sections-routing.module';
import { SectionListComponent } from './section-list/section-list.component';
import { SectionAddComponent } from './section-add/section-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SectionEditComponent } from './section-edit/section-edit.component';


@NgModule({
  declarations: [
    SectionListComponent,
    SectionAddComponent,
    SectionEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SectionsRoutingModule
  ]
})
export class SectionsModule { }
