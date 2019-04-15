import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCitationComponent } from './license-citation.component';

describe('LicenseCitationComponent', () => {
  let component: LicenseCitationComponent;
  let fixture: ComponentFixture<LicenseCitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseCitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
