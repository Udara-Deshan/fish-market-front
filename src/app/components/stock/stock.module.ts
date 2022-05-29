import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { CreateStockFormComponent } from './view/create-stock-form/create-stock-form.component';
import { AllStocksComponent } from './view/all-stocks/all-stocks.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    StockComponent,
    CreateStockFormComponent,
    AllStocksComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    SharedModule
  ],
  providers:[DatePipe]
})
export class StockModule { }
