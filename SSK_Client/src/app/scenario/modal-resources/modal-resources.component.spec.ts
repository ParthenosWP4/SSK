import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResourcesComponent } from './modal-resources.component';

describe('ModalResourcesComponent', () => {
  let component: ModalResourcesComponent;
  let fixture: ComponentFixture<ModalResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
