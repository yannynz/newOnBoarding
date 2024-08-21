import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPdfsComponent } from './admin-pdfs.component';

describe('AdminPdfsComponent', () => {
  let component: AdminPdfsComponent;
  let fixture: ComponentFixture<AdminPdfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPdfsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
