import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLembretesComponent } from './admin-lembretes.component';

describe('AdminLembretesComponent', () => {
  let component: AdminLembretesComponent;
  let fixture: ComponentFixture<AdminLembretesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLembretesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLembretesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
