import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  httpClient = inject(HttpClient)
  private items = [
    { title: 'Item 1', description: 'Description 1', priority: 'Low', dueDate: '2023-07-10', createdAt: new Date('2023-06-01'), completed: false },
    { title: 'Item 2', description: 'Description 1', priority: 'High', dueDate: '2023-07-05', createdAt: new Date('2023-06-03'), completed: false }
  ];

  constructor(private toastr: ToastrService) {}

  getItems() {
    return this.items;
  }

  getItem(index: number) {
    return this.items[index];
  }

  addTask(item: { title: string; description: string; priority: string; dueDate: any; createdAt: Date, completed: false }) {
    // return this.httpClient.post("http://localhost:3000/tasks",{
    //   title:item.title,
    //   description: item.description,
    //   dueDate: item.dueDate,
    //   priority: item.priority,
    //   completed: item.completed,
    //   createdAt: item.createdAt
    // })
    this.items.push(item);
    this.sortTasks();
    this.toastr.success('Task added successfully!');
  }

  updateTask(index: number, item: { title: string; description: string; priority: string; dueDate: any; createdAt: Date , completed: false}) {
    this.items[index] = item;
    this.sortTasks();
    this.toastr.success('Task updated successfully!');
  }

  completeTask(index: number) {
    this.items[index].completed = true;
    this.toastr.success('Task completed successfully!');
    console.log(this.items[index]);
  }

  deleteTask(index: number) {
    this.items.splice(index, 1);
    this.sortTasks();
    this.toastr.success('Task deleted successfully!');
  }

  sortTasks() {
    this.items.sort((a, b) => {
      if (this.priorityValue(a.priority) !== this.priorityValue(b.priority)) {
        return this.priorityValue(b.priority) - this.priorityValue(a.priority);
      }
      if (new Date(a.dueDate).getTime() !== new Date(b.dueDate).getTime()) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
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
