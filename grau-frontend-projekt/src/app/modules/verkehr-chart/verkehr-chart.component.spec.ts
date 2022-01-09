import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerkehrChartComponent } from './verkehr-chart.component';

describe('VerkehrChartComponent', () => {
  let component: VerkehrChartComponent;
  let fixture: ComponentFixture<VerkehrChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerkehrChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerkehrChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
