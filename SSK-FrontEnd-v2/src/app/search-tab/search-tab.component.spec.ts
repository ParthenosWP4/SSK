import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTabComponent } from './search-tab.component';

describe('SearchTabComponent', () => {
  let component: SearchTabComponent;
  let fixture: ComponentFixture<SearchTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
