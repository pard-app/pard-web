import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorListingsSearchComponent } from './vendor-listings-search.component';

describe('VendorListingsSearchComponent', () => {
  let component: VendorListingsSearchComponent;
  let fixture: ComponentFixture<VendorListingsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorListingsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorListingsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
