import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeuzeschermComponent } from './keuzescherm.component';

describe('KeuzeschermComponent', () => {
  let component: KeuzeschermComponent;
  let fixture: ComponentFixture<KeuzeschermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeuzeschermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeuzeschermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
