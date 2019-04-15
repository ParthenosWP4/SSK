import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioTemplateComponent } from './scenario-template.component';

describe('ScenarioTemplateComponent', () => {
  let component: ScenarioTemplateComponent;
  let fixture: ComponentFixture<ScenarioTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
