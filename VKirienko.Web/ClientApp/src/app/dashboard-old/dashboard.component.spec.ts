import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOldComponent } from './dashboard.component';

describe('DashboardOldComponent', () => {
  let component: DashboardOldComponent;
  let fixture: ComponentFixture<DashboardOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
