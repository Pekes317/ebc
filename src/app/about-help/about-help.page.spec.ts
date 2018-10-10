import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHelpPage } from './about-help.page';

describe('AboutHelpPage', () => {
  let component: AboutHelpPage;
  let fixture: ComponentFixture<AboutHelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutHelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
