import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';
import { PhoneService } from '../../services/phone.service';
import { ValidationResponse } from '../../models/validation.model';
import { Country } from '../../models/country.model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppRouteNames } from 'src/app/shared/route-config';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css'],
})
export class ValidatorComponent implements OnInit, OnDestroy {
  title: String = 'Phone Number Validator';
  validatorForm: FormGroup = new FormGroup({});
  isLoading = false;
  selectedCountry?: Country;
  validationLoading = false;
  supportedCountriesObject: any;
  validationResponseData?: ValidationResponse;
  subscriptions: Subscription[] = [];
  supportedCountries?: Country[] = [];
  allCountries?: Country[];
  staticCountries?: Country[];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private phoneService: PhoneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchCountries();
    this.checkCountryChanges();
  }

  //check if country code changes and validations
  checkCountryChanges(): void {
    this.subscriptions.push(
      this.validatorForm
        .get(['country_code'])!
        .valueChanges.subscribe((value) => {
          if (value) {
            this.validatorForm.controls.number.addValidators([
              Validators.maxLength(20),
            ]);
            this.validatorForm.controls.number.updateValueAndValidity();
          }
        })
    );
  }

  //check if path exists and set the country code
  checkNumberValidityIfPathExists(): void {
    const countryCode = this.router.url.split('/')[2]?.toUpperCase();
    const phoneNumber = this.router.url.split('/')[3];
    if (countryCode && phoneNumber) {
      this.validatorForm.patchValue({
        country_code: countryCode,
        number: phoneNumber,
      });
      this.submitForm();
    }
  }
  initializeForm(): void {
    this.validatorForm = this.formBuilder.group({
      country_code: new FormControl(''),
      number: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
  }

  submitForm(): void {
    this.validationResponseData = undefined;
    this.validationLoading = true;

    this.subscriptions.push(
      this.phoneService.verifyNumber(this.validatorForm.value).subscribe(
        (res) => {
          this.validationResponseData = res;
          this.selectedCountry = this.supportedCountries!.find(
            (country) =>
              country.alpha2Code === this.validationResponseData!.country_code
          );
          if (this.selectedCountry) {
            this.location.replaceState(
              `${
                AppRouteNames.Home
              }/${this.selectedCountry?.alpha2Code.toLowerCase()}/${
                this.validationResponseData.local_format
              }`
            );
          }
          if (res.error) {
          }
        },
        (error) => {
          console.error('Oops an error occurred', error);
        },
        () => {
          this.validationLoading = false;
        }
      )
    );
  }

  //fetch all countries and filter supported countries
  fetchCountries(): void {
    this.isLoading = true;
    this.subscriptions.push(
      forkJoin([
        this.phoneService.getAllCountries(),
        this.phoneService.getSupportedCountries(),
      ]).subscribe(
        (res) => {
          this.allCountries = res[0];
          this.supportedCountriesObject = res[1];
          this.getSupportedCountries();
        },
        (error) => {
          console.error('Oops an error occurred', error);
        },
        () => {
          this.isLoading = false;
        }
      )
    );
  }

  onCountrySearch(event: any): void {
    this.supportedCountries = this.staticCountries;
    this.supportedCountries = this.searchCountry(event.target.value);
  }

  //filter supported countries by filter name
  searchCountry(value: string): Country[] {
    const filter = value.toLowerCase();
    return this.supportedCountries!.filter((option) =>
      option.name.toLowerCase().startsWith(filter)
    );
  }

  //loop through all countries and filter supported countries and store in staticCountries
  getSupportedCountries(): void {
    const supportedCountryCodes = Object.keys(this.supportedCountriesObject);
    this.supportedCountries = this.allCountries?.filter((country) =>
      supportedCountryCodes.includes(country.alpha2Code)
    );
    this.staticCountries = this.supportedCountries;
    this.checkNumberValidityIfPathExists();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
