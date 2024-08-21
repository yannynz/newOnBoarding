import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiVideosComponent } from './ti-videos.component';

describe('TiVideosComponent', () => {
  let component: TiVideosComponent;
  let fixture: ComponentFixture<TiVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
