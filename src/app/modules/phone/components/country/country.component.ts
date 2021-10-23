import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  @Input()
  flagUrl?: string;

  @Input()
  countryName?: string;

  @Input()
  callingCode?: string;

  constructor() {}

  ngOnInit(): void {}
}
