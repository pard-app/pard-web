import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLoadMoreComponent } from './button-load-more.component';

describe('ButtonLoadMoreComponent', () => {
  let component: ButtonLoadMoreComponent;
  let fixture: ComponentFixture<ButtonLoadMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonLoadMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
