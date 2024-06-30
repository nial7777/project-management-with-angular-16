import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from 'src/app/shared/services/task-service/task-service.service';
import { DatePipe } from '@angular/common'; // Import DatePipe
declare var $: any;
@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TaskAddComponent {
  taskForm: FormGroup;
  items = [
    { title: 'Item 1', description: 'Description 1', priority: 'High' },
    { title: 'Item 2', description: 'Description 2', priority: 'Normal' },
  ];
  priorities = ['High', 'Normal', 'Low'];
  editMode = false;
  currentItemIndex: number | null = null;
  editIndex: number | null = null;
  constructor(private fb: FormBuilder,
    private _router: Router,
    private _taskService: TaskServiceService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [null],
      dueDate: [null, Validators.required],
      priority: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.editIndex = +params['id'];
        const item = this._taskService.getItem(this.editIndex);
        this.taskForm.patchValue(item)
        //   title: item.title,
        //   description: item.description,
        //   dueDate: {
        //     year: new Date(item.dueDate).getFullYear(),
        //     month: new Date(item.dueDate).getMonth() + 1,
        //     day: new Date(item.dueDate).getDate()
        //   },
        //   priority: item.priority
        // });
      }
    });
  }


  // ngAfterViewInit(): void {
  //   $('#dueDate').datepicker({
  //     format: 'yyyy-mm-dd',
  //     autoclose: true
  //   }).on('changeDate', (e: any) => {
  //     // Format date for form submission
  //     this.taskForm.get('dueDate')?.setValue(this.formatedDate(e.date));
  //   });
  // }

  formatedDate(date: any): string {
    if (date instanceof Date) {
      return date.toISOString().slice(0, 10); // 'yyyy-mm-dd'
    }
    return '';
  }


  onSubmit() {
    if (this.taskForm.valid) {
      const formattedDueDate = this.datePipe.transform(this.taskForm.value.dueDate, 'yyyy-MM-dd');
      const taskData = {
        ...this.taskForm.value,
        dueDate: formattedDueDate,
        createdAt: this.editIndex !== null ? this._taskService.getItem(this.editIndex).createdAt : new Date()
      };
      if (this.editIndex !== null) {
        this._taskService.updateTask(this.editIndex, taskData);
      } else {
        this._taskService.addTask(taskData);
      }
      this._router.navigateByUrl('/tasks'); // Adjusted navigation URL
    }
  }

  closeModal() {
    this._router.navigateByUrl('/tasks');
  }
}
