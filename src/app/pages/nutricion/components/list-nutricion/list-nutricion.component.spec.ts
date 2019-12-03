import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNutricionComponent } from './list-nutricion.component';

describe('ListNutricionComponent', () => {
  let component: ListNutricionComponent;
  let fixture: ComponentFixture<ListNutricionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNutricionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNutricionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
