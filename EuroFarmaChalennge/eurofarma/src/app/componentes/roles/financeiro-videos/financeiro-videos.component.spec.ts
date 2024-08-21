import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroVideosComponent } from './financeiro-videos.component';

describe('FinanceiroVideosComponent', () => {
  let component: FinanceiroVideosComponent;
  let fixture: ComponentFixture<FinanceiroVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceiroVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceiroVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
