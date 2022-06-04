import {Component, OnInit} from '@angular/core';
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
import {CoolingRoomTypeService} from "../../../../core/common/service/cooling-room-type.service";

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
  selectedCoolingRoomType!: CoolingRoomTypeDTO | null;
  filteredCoolingRooms!: CoolingRoomDTO[];
  selectedCoolingRoom!: CoolingRoomDTO | null;
  selectedDescriptionDTOS: DescriptionDTO[] = [];
  dataSource: MatTableDataSource<DescriptionDTO>;
  displayedColumns: string[] = [ 'id', 'fishName', 'fishWeight', 'coolingRoomId', 'tokenId', 'price','action'];
  fakeList: string[] = ['id', 'fishName', 'fishWeight', 'coolingRoomId', 'tokenId', 'price'];


  constructor(private formBuilder: FormBuilder,
              private stockService: StockService,
              private customerService: CustomerService,
              private coolingRoomService: CoolingRoomService,
              private coolingRoomTypeService: CoolingRoomTypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private pipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource(this.selectedDescriptionDTOS);

    let t1 = ['3', '341'];
    let t2 = ['145', '224', '3354', '3', '348', '3452', '341'];
    console.log(t2.filter(el => !t1.includes(el)));
    console.log('ff')


  }

  ngOnInit(): void {
    this.stockDetailsForm = this.formBuilder.group({
      customer: ['', Validators.required],
      whoIssued: ['', Validators.required],
    });
    this.stockDescDetailsForm = this.formBuilder.group({
      coolingRoomType: ['', Validators.required],
      fishName: ['', Validators.required],
      fishWeight: ['', Validators.required],
      coolingRoom: [{value: "", disabled: true}, Validators.required],
    });
    this.activatedRoute.params.subscribe(async params => {
      if (params.hasOwnProperty('id')) {
        let res = await this.stockService.getById(Object.values(params)[0]);
        this.currentStock = res.data;
        let res2=await this.customerService.getById(String(this.currentStock.tokenDTO.customerId));
        this.selectedCustomer=res2.data;
        this.formMode = 'UPDATE';
        this.stockDetailsForm.get('customer')?.setValue(this.currentStock.tokenDTO.customerName);
        this.stockDetailsForm.get('whoIssued')?.setValue(this.currentStock.tokenDTO.whoIssued);
        this.selectedDescriptionDTOS=this.currentStock.descriptionDTOS;
        this.dataSource = new MatTableDataSource(this.selectedDescriptionDTOS);
        // this.stockDetailsForm.get('shopOwnerName')?.setValue(this.currentStock.shopOwnerName);
        // this.stockDetailsForm.get('nic')?.setValue(this.currentStock.nic);
        // this.stockDetailsForm.get('contactNo')?.setValue(this.currentStock.contactNo);
      }
    });
    this.getCoolingRoomTypes();
  }

  getCoolingRoomTypes() {
    this.coolingRoomTypeService.getAll(0, 10).subscribe(res => {
      console.log(res)
      if (res.code === 200) {
        console.log(res)
        this.filteredCoolingRoomTypes = res.data;
      }
    });
  }

  getCustomers() {
    const value = this.stockDetailsForm.get('customer')?.value;
    this.customerService.search(0, 10, value).subscribe(res => {
      console.log(res)
      if (res.code === 200) {
        console.log(res)
        this.filteredCustomers = res.data;
      }
    });
  }

  getCoolingRoms() {
    this.coolingRoomService.getAllAvailableCoolingRoomsByType(0, 10, <number>this.selectedCoolingRoomType?.id).subscribe(res => {
      console.log(res)
      if (res.code === 200) {
        console.log(res)
        this.filteredCoolingRooms = this.filterCoolingRooms([res.data]);
        this.stockDescDetailsForm?.enable();
      }
    });
  }

  filterCoolingRooms(ar: CoolingRoomDTO[]): CoolingRoomDTO[] {
    return ar?.filter(el => {
      for (let i = 0; i < this.selectedDescriptionDTOS.length; i++) {
        if (el.id === this.selectedDescriptionDTOS[i].coolingRoomId) {
          return false;
        }
      }
      return true;
    })
  }

  descFormReset() {
    this.stockDescDetailsForm.reset();
    this.selectedCoolingRoom = null;
    this.filteredCoolingRooms = [];
    this.selectedCoolingRoomType = null;
  }

  onAction(): void {
    if (this.stockDetailsForm.valid) {
      this.apiResponse = true;
      let sub: Observable<any>;
      if (this.formMode === 'CREATE') {
        sub = this.createStock();
      } else {
        console.log('heara')
        sub = this.updateStock();
      }
      sub.subscribe(res => {
        this.apiResponse = false;
        this.resetForms();
        if (this.formMode == 'CREATE') {
          let blob = new Blob([res], {type: 'application/pdf'});
          let pdfUrl = window.URL.createObjectURL(blob);
          window.open(pdfUrl);
        }

        if (this.formMode == 'UPDATE') {
          console.log('res')
          console.log(res)
          this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        }
      }, error => {
        this.apiResponse = false;
      });
    }
  }

  clear() {
    this.stockDetailsForm.reset();
  }

  resetForms(){
    this.stockDetailsForm.reset();
    this.selectedDescriptionDTOS=[];
  }
  Cancel() {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }

  private createStock(): Observable<any> {
    let token = new TokenDTO(
      0,
      this.stockDetailsForm.get('whoIssued')?.value,
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
    let token = new TokenDTO(
      this.currentStock?.tokenDTO?.id,
      this.currentStock?.tokenDTO?.whoIssued,
      this.pipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss') as string,
      this.selectedCustomer?.id,
      this.selectedCustomer?.shopOwnerName,
      this.currentStock?.tokenDTO?.status,
    );
    return this.stockService.update(new StockDTO(
      token,
      this.selectedDescriptionDTOS
    ))
  }


  removeDesc(row: any) {

    this.selectedDescriptionDTOS = this.selectedDescriptionDTOS.filter(el => el.id !== row.id);
    this.dataSource = new MatTableDataSource(this.selectedDescriptionDTOS);
  }

  addToList() {
    if (this.stockDescDetailsForm.valid) {
      let x = new DescriptionDTO(
        Number(this.selectedDescriptionDTOS.length),
        this.stockDescDetailsForm.get('fishName')?.value,
        this.stockDescDetailsForm.get('fishWeight')?.value,
        <number>this.selectedCoolingRoom?.id,
        0,
        1,
      );
      this.selectedDescriptionDTOS.push(x);
      this.dataSource = new MatTableDataSource(this.selectedDescriptionDTOS);
      this.descFormReset();
    }
  }

  selectCoolingRoomType(option: CoolingRoomTypeDTO) {
    this.selectedCoolingRoomType = option;
    this.getCoolingRoms();
  }
}
