import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidateWrapperComponent } from './input-validate-wrapper.component';

describe('InputValidateWrapperComponent', () => {
  let component: InputValidateWrapperComponent;
  let fixture: ComponentFixture<InputValidateWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputValidateWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputValidateWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
