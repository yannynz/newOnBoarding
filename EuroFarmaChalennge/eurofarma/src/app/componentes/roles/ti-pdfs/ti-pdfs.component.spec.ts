import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiPdfsComponent } from './ti-pdfs.component';

describe('TiPdfsComponent', () => {
  let component: TiPdfsComponent;
  let fixture: ComponentFixture<TiPdfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiPdfsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiPdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
