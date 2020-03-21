import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageVendorsListComponent } from './page-vendors-list.component';

describe('PageVendorsListComponent', () => {
  let component: PageVendorsListComponent;
  let fixture: ComponentFixture<PageVendorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVendorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageVendorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
