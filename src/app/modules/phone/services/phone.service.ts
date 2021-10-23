import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country.model';
import { ValidationResponse } from '../models/validation.model';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private countryUrl: string = environment.countryApi;
  private numVerifyUrl: string = environment.numVerifyApi;
  private numVerifyApiKey: string = environment.numVerifyApiKey;
  private accessKeyParam = `access_key=${this.numVerifyApiKey}`;

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countryUrl}`);
  }

  getSupportedCountries(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.numVerifyUrl}/countries?${this.accessKeyParam}`
    );
  }

  verifyNumber(data: any): Observable<ValidationResponse> {
    return this.http.get<ValidationResponse>(
      `${this.numVerifyUrl}/validate?${
        this.accessKeyParam
      }&${this.getQueryString(data)}`
    );
  }

  getQueryString(filter: any): string {
    return Object.keys(filter)
      .map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]);
      })
      .join('&');
  }
}
