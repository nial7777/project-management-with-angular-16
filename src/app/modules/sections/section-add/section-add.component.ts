
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionServiceService } from 'src/app/shared/services/section-service/section-service.service';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.css']
})
export class SectionAddComponent implements OnInit {
  itemForm: FormGroup;
  items = [
    { title: 'Item 1', priority: 'High' },
    { title: 'Item 2', priority: 'Normal' },
  ];
  priorities = ['High', 'Normal', 'Low'];
  editMode = false;
  currentItemIndex: number | null = null;
  editIndex: number | null = null;
  constructor(private fb: FormBuilder,
    private _router: Router,
    private _itemService: SectionServiceService,
    private route: ActivatedRoute,
  ) {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      priority: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.editIndex = +params['id'];
        const item = this._itemService.getItem(this.editIndex);
        this.itemForm.patchValue(item);
      }
    });
  }


  onSubmit() {
    if (this.itemForm.valid) {
      if (this.editIndex !== null) {
        this._itemService.updateSection(this.editIndex, this.itemForm.value);
      } else {
        this._itemService.addSection(this.itemForm.value);
      }
      this._router.navigateByUrl('/');
    }
  }

  closeModal() {
    this._router.navigateByUrl('/');
  }
}

