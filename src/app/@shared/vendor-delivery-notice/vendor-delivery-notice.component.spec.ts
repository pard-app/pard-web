import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDeliveryNoticeComponent } from './vendor-delivery-notice.component';

describe('VendorDeliveryNoticeComponent', () => {
  let component: VendorDeliveryNoticeComponent;
  let fixture: ComponentFixture<VendorDeliveryNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorDeliveryNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDeliveryNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
