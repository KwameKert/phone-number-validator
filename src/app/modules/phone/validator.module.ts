import { NgModule } from '@angular/core';
import { ValidatorComponent } from './components/validator/validator.component';
import { CountryComponent } from './components/country/country.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ValidityComponent } from './components/validity/validity.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ValidatorComponent,
    CountryComponent,
    PreloaderComponent,
    ValidityComponent,
  ],
  imports: [SharedModule],
})
export class ValidatorModule {}
