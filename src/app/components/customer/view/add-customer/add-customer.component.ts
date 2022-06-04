import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerDTO} from "../../../../core/common/dto/CustomerDTO";
import {CustomerService} from "../../../../core/common/service/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customerDetailsForm!: FormGroup;
  apiResponse = false;
  currentCustomer!: CustomerDTO;
  formMode: 'CREATE' | 'UPDATE' = 'CREATE';


  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              ) {
  }

  ngOnInit(): void {
    this.customerDetailsForm = this.formBuilder.group({
      shopName: ['', Validators.required],
      shopOwnerName: ['', Validators.required],
      nic: ['',Validators.required],
      contactNo: ['', Validators.required],
    });
    this.activatedRoute.params.subscribe(async params => {
      if (params.hasOwnProperty('id')) {
        let res = await this.customerService.getById(Object.values(params)[0]);
        this.currentCustomer = res.data;
        this.formMode = 'UPDATE';
        this.customerDetailsForm.get('shopName')?.setValue(this.currentCustomer.shopName);
        this.customerDetailsForm.get('shopOwnerName')?.setValue(this.currentCustomer.shopOwnerName);
        this.customerDetailsForm.get('nic')?.setValue(this.currentCustomer.nic);
        this.customerDetailsForm.get('contactNo')?.setValue(this.currentCustomer.contactNo);
      }
    });
  }
  onAction(): void {
    if (this.customerDetailsForm.valid) {
      this.apiResponse = true;
      let sub: Observable<any>;
      if (this.formMode === 'CREATE') {
        sub = this.createCustomer();
      } else {
        sub = this.updateCustomer();
      }
      sub.subscribe(res => {
        this.apiResponse = false;
        if (res.code === 201||res.code===204) {
          this.customerDetailsForm.reset();
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
    this.customerDetailsForm.reset();
  }

  Cancel() {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }

  private createCustomer(): Observable<any> {
    return this.customerService.create(new CustomerDTO(
      0,
      this.customerDetailsForm.get('shopName')?.value,
      this.customerDetailsForm.get('shopOwnerName')?.value,
      this.customerDetailsForm.get('nic')?.value,
      this.customerDetailsForm.get('contactNo')?.value,
    1
    ))
  }

  private updateCustomer(): Observable<any> {
    return this.customerService.update(new CustomerDTO(
      this.currentCustomer.id,
      this.customerDetailsForm.get('shopName')?.value,
      this.customerDetailsForm.get('shopOwnerName')?.value,
      this.customerDetailsForm.get('nic')?.value,
      this.customerDetailsForm.get('contactNo')?.value,
      this.currentCustomer.status
    ))
  }


}
