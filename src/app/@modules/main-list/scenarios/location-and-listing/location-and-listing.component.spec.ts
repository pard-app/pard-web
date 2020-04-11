import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAndListingComponent } from './location-and-listing.component';

describe('LocationAndListingComponent', () => {
  let component: LocationAndListingComponent;
  let fixture: ComponentFixture<LocationAndListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAndListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAndListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
