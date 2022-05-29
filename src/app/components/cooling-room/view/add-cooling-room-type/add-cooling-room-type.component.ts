import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoolingRoomTypeDTO} from "../../../../core/common/dto/CoolingRoomTypeDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {CoolingRoomTypeService} from "../../../../core/common/service/cooling-room-type.service";

@Component({
  selector: 'app-add-cooling-room-type',
  templateUrl: './add-cooling-room-type.component.html',
  styleUrls: ['./add-cooling-room-type.component.scss']
})
export class AddCoolingRoomTypeComponent implements OnInit {
  coolingRoomTypeDetailsForm!: FormGroup;
  apiResponse = false;
  currentCoolingRoomType!: CoolingRoomTypeDTO;
  formMode: 'CREATE' | 'UPDATE' = 'CREATE';


  constructor(private formBuilder: FormBuilder,
              private coolingRoomTypeService: CoolingRoomTypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.coolingRoomTypeDetailsForm = this.formBuilder.group({
      typeName: ['', Validators.required],
      typePrice: ['', Validators.required],

    });
    this.activatedRoute.params.subscribe(async params => {
      if (params.hasOwnProperty('id')) {
        this.formMode = 'UPDATE';
        let res = await this.coolingRoomTypeService.getById(Object.values(params)[0]);
        this.currentCoolingRoomType = res.data;
        this.coolingRoomTypeDetailsForm.get('typeName')?.setValue(this.currentCoolingRoomType.typeName);
        this.coolingRoomTypeDetailsForm.get('typePrice')?.setValue(this.currentCoolingRoomType.typePrice);
      }
    });
  }
  onAction(): void {
    if (this.coolingRoomTypeDetailsForm.valid) {
      this.apiResponse = true;
      let sub: Observable<any>;
      if (this.formMode === 'CREATE') {
        sub = this.createCoolingRoomType();
      } else {
        sub = this.updateCoolingRoomType();
      }
      sub.subscribe(res => {
        this.apiResponse = false;
        if (res.code === 201||res.code===204) {
          this.coolingRoomTypeDetailsForm.reset();
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
    this.coolingRoomTypeDetailsForm.reset();
  }

  Cancel() {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }

  private createCoolingRoomType(): Observable<any> {
    return this.coolingRoomTypeService.create(new CoolingRoomTypeDTO(
      0,
      this.coolingRoomTypeDetailsForm.get('typeName')?.value,
      this.coolingRoomTypeDetailsForm.get('typePrice')?.value,
      1
    ))
  }

  private updateCoolingRoomType(): Observable<any> {
    return this.coolingRoomTypeService.update(new CoolingRoomTypeDTO(
      this.currentCoolingRoomType.id,
      this.coolingRoomTypeDetailsForm.get('typeName')?.value,
      this.coolingRoomTypeDetailsForm.get('typePrice')?.value,
      this.currentCoolingRoomType.status
    ))
  }

}
