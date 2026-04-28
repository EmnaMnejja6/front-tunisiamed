import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedClinicsComponent } from './featured-clinics.component';

describe('FeaturedClinicsComponent', () => {
  let component: FeaturedClinicsComponent;
  let fixture: ComponentFixture<FeaturedClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedClinicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
