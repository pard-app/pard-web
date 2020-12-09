import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingBoxComponent } from './loading-box.component';

describe('LoadingBoxComponent', () => {
  let component: LoadingBoxComponent;
  let fixture: ComponentFixture<LoadingBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
