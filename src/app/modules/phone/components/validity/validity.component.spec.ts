import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ValidityComponent } from './validity.component';

describe('ValidationResponseComponent', () => {
  let component: ValidityComponent;
  let fixture: ComponentFixture<ValidityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render the validity message if input is null', () => {
    expect(fixture.debugElement.query(By.css('.row'))).toBeNull();
  });
});
