import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskServiceService } from 'src/app/shared/services/task-service/task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  constructor(
    private _router: Router,
    private _taskService: TaskServiceService,
  ){
   
  }

  ngOnInit(): void {
    this.items = this._taskService.getItems();
  }


  items: any[] = [
    { title: 'Item 1', description: 'Description 1', dueDate: '2024-05-01', priority: 'Low'}
  ];


  addTask(){
    this._router.navigateByUrl('tasks/task-form');
  }

  editTask(index: number) {
    this._router.navigate(['tasks/task-form/', index + 1]);
  }

  deleteTask(index: number) {
    this._taskService.deleteTask(index);
    this.items = this._taskService.getItems(); // Refresh the list
  }

  completeTask(index: number) {
    const task = this.items[index];
    task.completed = true; // Mark the task as completed
    this._taskService.completeTask(index);
    
    
  }
}
