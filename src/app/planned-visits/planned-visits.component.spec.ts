import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedVisitsComponent } from './planned-visits.component';

describe('PlannedVisitsComponent', () => {
  let component: PlannedVisitsComponent;
  let fixture: ComponentFixture<PlannedVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannedVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
