import {
  MatButtonModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatStepperModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
})

export class AuthMaterialModule {}
