import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSpecialtiesComponent } from './featured-specialties.component';

describe('FeaturedSpecialtiesComponent', () => {
  let component: FeaturedSpecialtiesComponent;
  let fixture: ComponentFixture<FeaturedSpecialtiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedSpecialtiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedSpecialtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
