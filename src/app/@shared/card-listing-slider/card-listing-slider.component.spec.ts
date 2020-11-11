import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListingSliderComponent } from './card-listing-slider.component';

describe('CardListingSliderComponent', () => {
  let component: CardListingSliderComponent;
  let fixture: ComponentFixture<CardListingSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListingSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListingSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
