import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInContructionComponent } from './page-in-contruction.component';

describe('PageInContructionComponent', () => {
  let component: PageInContructionComponent;
  let fixture: ComponentFixture<PageInContructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInContructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInContructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
