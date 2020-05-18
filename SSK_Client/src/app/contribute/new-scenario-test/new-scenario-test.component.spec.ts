import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScenarioTestComponent } from './new-scenario-test.component';

describe('NewScenarioTestComponent', () => {
  let component: NewScenarioTestComponent;
  let fixture: ComponentFixture<NewScenarioTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewScenarioTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScenarioTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
