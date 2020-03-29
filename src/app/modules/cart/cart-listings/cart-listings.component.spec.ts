import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListingsComponent } from './cart-listings.component';

describe('CartListingsComponent', () => {
  let component: CartListingsComponent;
  let fixture: ComponentFixture<CartListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
