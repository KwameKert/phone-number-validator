import { Component, Input, OnInit } from '@angular/core';
import { ValidationResponse } from '../../models/validation.model';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-validity',
  templateUrl: './validity.component.html',
  styleUrls: ['./validity.component.css'],
})
export class ValidityComponent implements OnInit {
  @Input() validityData?: ValidationResponse;

  @Input() country?: Country;

  constructor() {}

  ngOnInit(): void {}
}
