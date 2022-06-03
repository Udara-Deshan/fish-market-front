import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {DashboardComponent} from "./Dashboard/dashboard/dashboard.component";

const routes: Routes = [{
  path: '', component: LayoutComponent, children:
    [
      {
        path:'',component:DashboardComponent
      },
      {
        path: 'customer',
        loadChildren: () => import('../../components/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'cooling-room',
        loadChildren: () => import('../../components/cooling-room/cooling-room.module').then(m => m.CoolingRoomModule)
      },
      {path: 'stock', loadChildren: () => import('../../components/stock/stock.module').then(m => m.StockModule)},
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
