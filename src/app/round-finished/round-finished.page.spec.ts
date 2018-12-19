import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundFinishedPage } from './round-finished.page';

describe('RoundFinishedPage', () => {
  let component: RoundFinishedPage;
  let fixture: ComponentFixture<RoundFinishedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundFinishedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundFinishedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
