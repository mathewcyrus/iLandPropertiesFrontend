import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundviewComponent } from './backgroundview.component';

describe('BackgroundviewComponent', () => {
  let component: BackgroundviewComponent;
  let fixture: ComponentFixture<BackgroundviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackgroundviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
