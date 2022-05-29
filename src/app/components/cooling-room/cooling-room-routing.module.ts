import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoolingRoomComponent } from './cooling-room.component';
import {AddCoolingRoomComponent} from "./view/add-cooling-room/add-cooling-room.component";
import {AllCoolingRoomsComponent} from "./view/all-cooling-rooms/all-cooling-rooms.component";
import {AllCoolingRoomTypesComponent} from "./view/all-cooling-room-types/all-cooling-room-types.component";
import {AddCoolingRoomTypeComponent} from "./view/add-cooling-room-type/add-cooling-room-type.component";

const routes: Routes = [{ path: '', component: CoolingRoomComponent ,
  children: [
    {path: 'add', component: AddCoolingRoomComponent},
    {path: 'all', component: AllCoolingRoomsComponent},
    {path: 'all/:id', component: AddCoolingRoomComponent},
    {path: 'type/add', component: AddCoolingRoomTypeComponent},
    {path: 'type/all', component: AllCoolingRoomTypesComponent},
    {path: 'type/all/:id', component: AddCoolingRoomTypeComponent},

  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoolingRoomRoutingModule { }
