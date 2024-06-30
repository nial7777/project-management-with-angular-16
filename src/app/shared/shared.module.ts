import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
// import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    NavbarComponent,
    SubMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    // NgSelectModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    SubMenuComponent,
    // NgSelectModule
  ],
  providers: [
    provideHttpClient()
  ]
})
export class SharedModule { }
