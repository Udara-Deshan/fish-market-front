import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { LeftSideNavBarComponent } from './left-side-nav-bar/left-side-nav-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ClientComponent } from './top-bar/inner-components/client/client.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { MenuContainerComponent } from './left-side-nav-bar/inner-component/manu-container/menu-container.component';
import {MatMenuModule} from "@angular/material/menu";
import { SharedModule } from '../../components/shared/shared.module';
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
  declarations: [
    LayoutComponent,
    LeftSideNavBarComponent,
    TopBarComponent,
    ClientComponent,
    MenuContainerComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    SharedModule,
    MatSidenavModule
  ]
})
export class LayoutModule { }
