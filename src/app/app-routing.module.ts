import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidatorComponent } from './modules/phone/components/validator/validator.component';
import { AppRouteNames } from './shared/route-config';

const routes: Routes = [
  { path: AppRouteNames.Home, component: ValidatorComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRouteNames.Home,
  },
  {
    path: `${AppRouteNames.Home}/:id/:id`,
    component: ValidatorComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
