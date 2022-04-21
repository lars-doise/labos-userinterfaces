import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorieenComponent } from './subcategorieen.component';

describe('SubcategorieenComponent', () => {
  let component: SubcategorieenComponent;
  let fixture: ComponentFixture<SubcategorieenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategorieenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategorieenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
