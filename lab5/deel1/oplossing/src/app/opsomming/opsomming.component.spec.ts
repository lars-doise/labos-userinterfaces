import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsommingComponent } from './opsomming.component';

describe('OpsommingComponent', () => {
  let component: OpsommingComponent;
  let fixture: ComponentFixture<OpsommingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsommingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsommingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
