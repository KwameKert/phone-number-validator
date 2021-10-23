import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PhoneService } from './phone.service';

describe('PhoneService', () => {
  let service: PhoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PhoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get all countries', () => {
    service.getAllCountries().subscribe((data) => {
      expect(data.length).toBeGreaterThan(0);
    });
  });

  it('get all supported countries', () => {
    service.getSupportedCountries().subscribe((data) => {
      expect(data.length).toBeGreaterThan(0);
    });
  });

  it('generate query string ', () => {
    let query = service.getQueryString({
      country: 'US',
      number: '1234567890',
    });
    expect(query).toBe('country=US&number=1234567890');
  });
});
