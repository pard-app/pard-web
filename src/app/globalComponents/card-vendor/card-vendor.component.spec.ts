import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVendorComponent } from './card-vendor.component';

describe('CardVendorComponent', () => {
  let component: CardVendorComponent;
  let fixture: ComponentFixture<CardVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
