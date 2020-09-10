import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaValoresComponent } from './bolsa-valores.component';

describe('BolsaValoresComponent', () => {
  let component: BolsaValoresComponent;
  let fixture: ComponentFixture<BolsaValoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsaValoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaValoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
