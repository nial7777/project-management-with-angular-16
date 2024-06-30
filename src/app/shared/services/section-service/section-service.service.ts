
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

export interface Section {
  id: number;
  title: string;
  priority: 'High' | 'Normal' | 'Low';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SectionServiceService {
  private items = [
    { title: 'Item 1', priority: 'Low', createdAt: new Date() },
    { title: 'Item 2', priority: 'High', createdAt: new Date() }
  ];

  constructor(private toastr: ToastrService,
    private httpClient: HttpClient,
  ) {}

  getItems() {
    return this.items;
  }

  getItem(index: number) {
    return this.items[index];
  }

  addSection(item: { title: string; priority: string }) {
    // this.httpClient.post("http://localhost:3000/sections",{
    //   title: item.title
    // })
    this.items.push({ ...item, createdAt: new Date() });
    this.toastr.success('Section added successfully!', '', { toastClass: 'toast-success-custom' });
    this.sortSections();
  }

  updateSection(index: number, item: { title: string; priority: string }) {
    this.items[index] = { ...item, createdAt: this.items[index].createdAt };
    this.toastr.success('Section updated successfully!', '', { toastClass: 'toast-success-custom' });
    this.sortSections();
  }

  deleteSection(index: number) {
    this.items.splice(index, 1);
    this.toastr.error('Section deleted successfully!', '', { toastClass: 'toast-error-custom' });
  }

  sortSections() {
    this.items.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
      return this.priorityValue(b.priority) - this.priorityValue(a.priority);
    });
  }

  priorityValue(priority: string): number {
    switch (priority) {
      case 'High': return 3;
      case 'Normal': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  }
}
