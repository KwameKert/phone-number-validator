import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, FormsModule],
  providers: [],
  exports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
    };
  }
}
