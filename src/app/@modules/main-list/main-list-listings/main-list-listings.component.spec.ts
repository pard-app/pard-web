import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListListingsComponent } from './main-list-listings.component';

describe('MainListListingsComponent', () => {
  let component: MainListListingsComponent;
  let fixture: ComponentFixture<MainListListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainListListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainListListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
