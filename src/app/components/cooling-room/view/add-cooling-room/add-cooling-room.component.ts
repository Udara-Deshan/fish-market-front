import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoolingRoomDTO} from "../../../../core/common/dto/CoolingRoomDTO";
import {Observable} from "rxjs";
import {CoolingRoomService} from "../../../../core/common/service/cooling-room.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CoolingRoomTypeService} from "../../../../core/common/service/cooling-room-type.service";
import {CoolingRoomTypeDTO} from "../../../../core/common/dto/CoolingRoomTypeDTO";

@Component({
  selector: 'app-add-cooling-room',
  templateUrl: './add-cooling-room.component.html',
  styleUrls: ['./add-cooling-room.component.scss']
})
export class AddCoolingRoomComponent implements OnInit {

  coolingRoomDetailsForm!: FormGroup;
  apiResponse = false;
  currentCoolingRoom!: CoolingRoomDTO;
  formMode: 'CREATE' | 'UPDATE' = 'CREATE';


  filteredCoolingRoomTypes!: CoolingRoomTypeDTO[];
  selectedCoolingRoomType!: CoolingRoomTypeDTO;
  constructor(private formBuilder: FormBuilder,
              private coolingRoomService: CoolingRoomService,
              private coolingRoomTypeService:CoolingRoomTypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.coolingRoomDetailsForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      roomTypeId: ['', Validators.required],

    });
    this.activatedRoute.params.subscribe(async params => {
      if (params.hasOwnProperty('id')) {
        this.formMode = 'UPDATE';
        let res = await this.coolingRoomService.getById(Object.values(params)[0]);
        this.currentCoolingRoom = res.data;
        this.coolingRoomDetailsForm.get('roomNumber')?.setValue(this.currentCoolingRoom.roomNumber);
        let res2 = await this.coolingRoomTypeService.getById(this.currentCoolingRoom.roomTypeId);
        this.selectedCoolingRoomType=res2.data;
        this.coolingRoomDetailsForm.get('roomTypeId')?.setValue(this.selectedCoolingRoomType.typeName);

      }
    });
    this.getCoolingRomsTypes();
  }

  getCoolingRomsTypes() {
      this.coolingRoomTypeService.getAll(0, 10).subscribe(res => {
        console.log(res)
        if (res.code === 200) {
          console.log(res)
          this.filteredCoolingRoomTypes = res.data;
        }
      });
  }


  onAction(): void {
    if (this.coolingRoomDetailsForm.valid) {
      this.apiResponse = true;
      let sub: Observable<any>;
      if (this.formMode === 'CREATE') {
        sub = this.createCoolingRoom();
      } else {
        sub = this.updateCoolingRoom();
      }
      sub.subscribe(res => {
        this.apiResponse = false;
        if (res.code === 201||res.code===204) {
          this.coolingRoomDetailsForm.reset();
        }else if(res.code===204){
          if (this.formMode==='UPDATE'){
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
          }
        }
      }, error => {
        this.apiResponse = false;
      });
    }
  }

  clear() {
    this.coolingRoomDetailsForm.reset();
  }

  Cancel() {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }

  private createCoolingRoom(): Observable<any> {
    return this.coolingRoomService.create(new CoolingRoomDTO(
      0,
      this.coolingRoomDetailsForm.get('roomNumber')?.value,
      this.selectedCoolingRoomType.id,
      1
    ))
  }

  private updateCoolingRoom(): Observable<any> {
    return this.coolingRoomService.update(new CoolingRoomDTO(
      this.currentCoolingRoom.id,
      this.coolingRoomDetailsForm.get('roomNumber')?.value,
      this.selectedCoolingRoomType.id,
      this.currentCoolingRoom.status
    ))
  }
}
