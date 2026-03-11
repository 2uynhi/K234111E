import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex58 } from './ex58';

describe('Ex58', () => {
  let component: Ex58;
  let fixture: ComponentFixture<Ex58>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex58]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex58);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
