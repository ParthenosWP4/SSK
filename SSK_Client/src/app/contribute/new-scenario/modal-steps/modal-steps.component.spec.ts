import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStepsComponent } from './modal-steps.component';

describe('ModalStepsComponent', () => {
  let component: ModalStepsComponent;
  let fixture: ComponentFixture<ModalStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
