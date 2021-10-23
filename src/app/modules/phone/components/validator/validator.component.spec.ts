import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ValidatorComponent } from './validator.component';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('PhoneComponent', () => {
  let component: ValidatorComponent;
  let fixture: ComponentFixture<ValidatorComponent>;
  let h2: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidatorComponent],
      providers: [FormBuilder, HttpClient, HttpHandler],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have app title', () => {
    expect(component.title).toContain('Phone Number Validator');
  });

  it('should have h2 text when loading is false.', () => {
    component.isLoading = false;
    fixture.detectChanges();
    h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain(component.title);
  });

  it('should not show phone container when loading is true', () => {
    expect(fixture.debugElement.query(By.css('.container'))).toBeNull();
  });
});
