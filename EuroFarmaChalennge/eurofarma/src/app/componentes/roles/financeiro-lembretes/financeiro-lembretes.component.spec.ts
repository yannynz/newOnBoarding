import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroLembretesComponent } from './financeiro-lembretes.component';

describe('FinanceiroLembretesComponent', () => {
  let component: FinanceiroLembretesComponent;
  let fixture: ComponentFixture<FinanceiroLembretesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceiroLembretesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceiroLembretesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
