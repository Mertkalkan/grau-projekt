import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FussgaengerChartComponent } from './fussgaenger-chart.component';

describe('FussgaengerChartComponent', () => {
  let component: FussgaengerChartComponent;
  let fixture: ComponentFixture<FussgaengerChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FussgaengerChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FussgaengerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
