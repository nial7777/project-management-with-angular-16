import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEditComponent } from './section-edit.component';

describe('SectionEditComponent', () => {
  let component: SectionEditComponent;
  let fixture: ComponentFixture<SectionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionEditComponent]
    });
    fixture = TestBed.createComponent(SectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
