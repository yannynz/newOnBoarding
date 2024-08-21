import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroPdfsComponent } from './financeiro-pdfs.component';

describe('FinanceiroPdfsComponent', () => {
  let component: FinanceiroPdfsComponent;
  let fixture: ComponentFixture<FinanceiroPdfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceiroPdfsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceiroPdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
