import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterFormPageRoutingModule } from './register-form-routing.module';

import { RegisterFormPage } from './register-form.page';
import { Components } from 'src/app/shared/components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterFormPageRoutingModule
  ],
  declarations: [RegisterFormPage],
  providers: [Components]
})
export class RegisterFormPageModule {}
