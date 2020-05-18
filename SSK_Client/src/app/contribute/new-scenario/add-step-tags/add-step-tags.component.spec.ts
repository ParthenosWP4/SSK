import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepTagsComponent } from './add-step-tags.component';

describe('AddStepTagsComponent', () => {
  let component: AddStepTagsComponent;
  let fixture: ComponentFixture<AddStepTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStepTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStepTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
