import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiLembretesComponent } from './ti-lembretes.component';

describe('TiLembretesComponent', () => {
  let component: TiLembretesComponent;
  let fixture: ComponentFixture<TiLembretesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiLembretesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiLembretesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
