import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SectionServiceService } from 'src/app/shared/services/section-service/section-service.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent {

  constructor(
    private _router: Router,
    private itemService: SectionServiceService,
  ){
   
  }

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }


  items: any[] = [
    { title: 'Item 1', priority: 'High'},
    { title: 'Item 2', priority: 'Medium'},
    { title: 'Item 3', priority: 'Low'}
  ];


  addSection(){
    this._router.navigateByUrl('sections/section-form');
  }

  editSection(index: number) {
    this._router.navigate(['sections/section-form/', index + 1]);
  }

  deleteSection(index: number) {
    this.itemService.deleteSection(index);
    this.items = this.itemService.getItems(); // Refresh the list
  }
  
}
