import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureGuageComponent } from './temperature-guage.component';

describe('TemperatureGuageComponent', () => {
  let component: TemperatureGuageComponent;
  let fixture: ComponentFixture<TemperatureGuageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureGuageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureGuageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
