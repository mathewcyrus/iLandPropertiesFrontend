import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySkeletonComponent } from './property-skeleton.component';

describe('PropertySkeletonComponent', () => {
  let component: PropertySkeletonComponent;
  let fixture: ComponentFixture<PropertySkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertySkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertySkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
