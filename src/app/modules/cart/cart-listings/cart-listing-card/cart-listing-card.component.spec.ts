import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListingCardComponent } from './cart-listing-card.component';

describe('CartListingCardComponent', () => {
  let component: CartListingCardComponent;
  let fixture: ComponentFixture<CartListingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartListingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
