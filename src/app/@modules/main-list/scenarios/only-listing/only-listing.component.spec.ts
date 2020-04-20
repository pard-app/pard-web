import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyListingComponent } from './only-listing.component';

describe('OnlyListingComponent', () => {
  let component: OnlyListingComponent;
  let fixture: ComponentFixture<OnlyListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlyListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
