import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DescriptionDTO, StockDTO, TokenDTO} from "../../../../core/common/dto/StockDTO";
import {StockService} from "../../../../core/common/service/stock.service";
import {CustomerDTO} from "../../../../core/common/dto/CustomerDTO";
import {CustomerService} from "../../../../core/common/service/customer.service";
import {MatTableDataSource} from "@angular/material/table";
import {CoolingRoomDTO} from "../../../../core/common/dto/CoolingRoomDTO";
import {DatePipe} from "@angular/common";
import {CoolingRoomService} from "../../../../core/common/service/cooling-room.service";
import {Observable} from "rxjs";
import {CoolingRoomTypeDTO} from "../../../../core/common/dto/CoolingRoomTypeDTO";

@Component({
  selector: 'app-create-stock-form',
  templateUrl: './create-stock-form.component.html',
  styleUrls: ['./create-stock-form.component.scss']
})
export class CreateStockFormComponent implements OnInit {

  stockDetailsForm!: FormGroup;
  stockDescDetailsForm!: FormGroup;
  apiResponse = false;
  currentStock!: StockDTO;
  formMode: 'CREATE' | 'UPDATE' = 'CREATE';
  filteredCustomers!: CustomerDTO[];
  selectedCustomer!: CustomerDTO;
  filteredCoolingRoomTypes!: CoolingRoomTypeDTO[];
  selectedCoolingRoomType!: CoolingRoomTypeDTO;
  filteredCoolingRooms!: CoolingRoomDTO[];
  selectedCoolingRoom!: CoolingRoomDTO;
  selectedDescriptionDTOS: DescriptionDTO[] = [];
  dataSource: MatTableDataSource<DescriptionDTO>;
  displayedColumns: string[] = ['action', 'id', 'fishName', 'fishWeight', 'coolingRoomId', 'tokenId', 'price'];
  fakeList: string[] = ['id', 'fishName', 'fishWeight', 'coolingRoomId', 'tokenId', 'price'];


  constructor(private formBuilder: FormBuilder,
              private stockService: StockService,
              private customerService: CustomerService,
              private coolingRoomService: CoolingRoomService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private pipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource(this.selectedDescriptionDTOS);

  }

  ngOnInit(): void {
    this.getCoolingRoms()
    this.stockDetailsForm = this.formBuilder.group({
      customer: ['', Validators.required],
      whoIssued: ['', Validators.required],
    });
    this.stockDescDetailsForm = this.formBuilder.group({
      fishName: ['', Validators.required],
      fishWeight: ['', Validators.required],
      coolingRoom: [{value:'',disable:true}, Validators.required],
    });
    this.activatedRoute.params.subscribe(async params => {
      if (params.hasOwnProperty('id')) {
        let res = await this.stockService.getById(Object.values(params)[0]);
        this.currentStock = res.data;
        this.formMode = 'UPDATE';
        // this.stockDetailsForm.get('shopName')?.setValue(this.currentStock.shopName);
        // this.stockDetailsForm.get('shopOwnerName')?.setValue(this.currentStock.shopOwnerName);
        // this.stockDetailsForm.get('nic')?.setValue(this.currentStock.nic);
        // this.stockDetailsForm.get('contactNo')?.setValue(this.currentStock.contactNo);
      }
    });
  }

  selectRoomType(){

  }

  getCustomers() {
    const value = this.stockDetailsForm.get('customer')?.value;
    if (value?.length > 2) {
      this.customerService.search(0, 10, value).subscribe(res => {
        console.log(res)
        if (res.code === 200) {
          console.log(res)
          this.filteredCustomers = res.data;
        }
      });
    }
  }

  getCoolingRoms() {
    this.coolingRoomService.getAll(0, 10, 1).subscribe(res => {
      console.log(res)
      if (res.code === 200) {
        console.log(res)
        this.filteredCoolingRooms = res.data;
      }
    });
  }

  onAction(): void {
    if (this.stockDetailsForm.valid) {
      this.apiResponse = true;
      let sub: Observable<any>;
      if (this.formMode === 'CREATE') {
        sub = this.createStock();
      } else {
        sub = this.updateStock();
      }
      sub.subscribe(res => {
        this.apiResponse = false;
        if (res.code === 201||res.code===204) {
          this.stockDetailsForm.reset();
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
    this.stockDetailsForm.reset();
  }

  Cancel() {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }

  private createStock(): Observable<any> {
    let token=new TokenDTO(
      0,
      '',
      this.pipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss') as string,
      this.selectedCustomer.id,
      this.selectedCustomer.shopOwnerName,
      1
    );

    return this.stockService.create(new StockDTO(
      token,
      this.selectedDescriptionDTOS
    ))
  }

  private updateStock(): Observable<any> {
    let token=new TokenDTO(
      this.currentStock?.tokenDTO?.id,
      this.currentStock?.tokenDTO?.whoIssued,
      this.pipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss') as string,
      this.selectedCustomer.id,
      this.selectedCustomer.shopOwnerName,
      1
    );
    return this.stockService.update(new StockDTO(
      token,
      this.selectedDescriptionDTOS
    ))
  }


  removeDesc(row: any) {

    this.selectedDescriptionDTOS = this.selectedDescriptionDTOS.filter(el=>el.id!==row.id);
    this.dataSource = new MatTableDataSource(this.selectedDescriptionDTOS);
  }

  addToList() {
    if (this.stockDescDetailsForm.valid) {
      let x = new DescriptionDTO(
        Number(this.selectedDescriptionDTOS.length),
        this.stockDescDetailsForm.get('fishName')?.value,
        this.stockDescDetailsForm.get('fishWeight')?.value,
        this.selectedCoolingRoom.id,
        0,
        1,
      );
      this.selectedDescriptionDTOS.push(x);
      this.dataSource = new MatTableDataSource(this.selectedDescriptionDTOS);
    }
  }
}