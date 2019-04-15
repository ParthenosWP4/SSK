import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScenarioComponent } from './new-scenario.component';

describe('NewScenarioComponent', () => {
  let component: NewScenarioComponent;
  let fixture: ComponentFixture<NewScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewScenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
