import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandardComponent } from './add-standard.component';

describe('AddStandardComponent', () => {
  let component: AddStandardComponent;
  let fixture: ComponentFixture<AddStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
