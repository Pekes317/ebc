import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicFormComponent } from './pic-form.component';

describe('PicFormComponent', () => {
  let component: PicFormComponent;
  let fixture: ComponentFixture<PicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PicFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
