import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoolingRoomRoutingModule } from './cooling-room-routing.module';
import { CoolingRoomComponent } from './cooling-room.component';
import { AddCoolingRoomComponent } from './view/add-cooling-room/add-cooling-room.component';
import { AllCoolingRoomsComponent } from './view/all-cooling-rooms/all-cooling-rooms.component';
import { AllCoolingRoomTypesComponent } from './view/all-cooling-room-types/all-cooling-room-types.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SharedModule} from "../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import { AddCoolingRoomTypeComponent } from './view/add-cooling-room-type/add-cooling-room-type.component';
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    CoolingRoomComponent,
    AddCoolingRoomComponent,
    AllCoolingRoomsComponent,
    AllCoolingRoomTypesComponent,
    AddCoolingRoomTypeComponent
  ],
    imports: [
        CommonModule,
        CoolingRoomRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        SharedModule,
        MatIconModule,
        MatSelectModule
    ]
})
export class CoolingRoomModule { }
