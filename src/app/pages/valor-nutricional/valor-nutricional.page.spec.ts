import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorNutricionalPage } from './valor-nutricional.page';

describe('ValorNutricionalPage', () => {
  let component: ValorNutricionalPage;
  let fixture: ComponentFixture<ValorNutricionalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValorNutricionalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorNutricionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
