import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { AddCustomerComponent } from './view/add-customer/add-customer.component';
import { AllCustomersComponent } from './view/all-customers/all-customers.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared/shared.module";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    CustomerComponent,
    AddCustomerComponent,
    AllCustomersComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    SharedModule,
    MatPaginatorModule
  ]
})
export class CustomerModule { }
