import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionReportPage } from './mission-report.page';

describe('MissionReportPage', () => {
  let component: MissionReportPage;
  let fixture: ComponentFixture<MissionReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
