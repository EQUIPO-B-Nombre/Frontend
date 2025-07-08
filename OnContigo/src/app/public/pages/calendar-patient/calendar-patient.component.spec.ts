import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPatientComponent } from './calendar-patient.component';

describe('CalendarPatientComponent', () => {
  let component: CalendarPatientComponent;
  let fixture: ComponentFixture<CalendarPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
