import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearMeItemsComponent } from './near-me-items.component';

describe('NearMeItemsComponent', () => {
  let component: NearMeItemsComponent;
  let fixture: ComponentFixture<NearMeItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearMeItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearMeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
