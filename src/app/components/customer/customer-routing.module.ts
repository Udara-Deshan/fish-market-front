import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import {AddCustomerComponent} from "./view/add-customer/add-customer.component";
import {AllCustomersComponent} from "./view/all-customers/all-customers.component";

const routes: Routes = [{ path: '', component: CustomerComponent ,
  children: [
    {path: 'add', component: AddCustomerComponent},
    {path: 'all', component: AllCustomersComponent},
    {path: 'all/:id', component: AddCustomerComponent},

  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
