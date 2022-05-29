import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './stock.component';
import {CreateStockFormComponent} from "./view/create-stock-form/create-stock-form.component";
import {AllStocksComponent} from "./view/all-stocks/all-stocks.component";

const routes: Routes = [{ path: '', component: StockComponent,
  children: [
    {path: 'create', component: CreateStockFormComponent},
    {path: 'all', component: AllStocksComponent},
    {path: 'all/:id', component: AllStocksComponent},

  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
