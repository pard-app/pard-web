import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCityComponent } from './card-city.component';

describe('CardCityComponent', () => {
  let component: CardCityComponent;
  let fixture: ComponentFixture<CardCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
