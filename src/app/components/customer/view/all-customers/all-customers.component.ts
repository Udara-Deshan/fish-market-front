import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CustomerDTO} from "../../../../core/common/dto/CustomerDTO";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CustomerService} from "../../../../core/common/service/customer.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SystemConfig} from "../../../../../assets/temp/SystemConfig";
import {ApprovalDialogComponent} from "../../../../core/dialogs/approval-dialog/approval-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/approval-dialog/model/ApprovalDialogConfig";

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit {
  displayedColumns: string[] = [ 'id','shopName','shopOwnerName','nic','contactNo','action'];
  dataSource: MatTableDataSource<Array<CustomerDTO>>;
  customers!: Array<CustomerDTO>[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tempPageEvent!: PageEvent;

  pageSizeOptions: number[];


  constructor(public customerService: CustomerService,
              public dialog:MatDialog,
              private router:Router,
  ) {
    this.pageSizeOptions = SystemConfig.getPageSizes();
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.paginator = this.paginator;

  }
  updatePermissions(){

  }

  ngOnInit(): void {
    this.updatePermissions();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }


  refreshTable(): void {
    this.loadTable(this.paginator.pageIndex,this.paginator.pageSize);
  }

  public loadTable(pageIndex: number, pageSize: number): void {
    this.customerService.getAll(pageIndex, pageSize)
      .subscribe(result => {
        console.log(result);
        this.paginator.length = result.data.length;
        this.dataSource = result.data;
      }, error => {
        console.log(error);
      });
  }

  public getServerData(event: PageEvent): any {
    this.loadTable(event.pageIndex, event.pageSize);
  }

  delete(customerDTO:CustomerDTO):void {
    const approval = this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure sir you want to delete this customer?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        this.customerService.delete(Number(customerDTO.id)).subscribe(res=>{
          this.refreshTable();
        });
      }
    });
  }

  updateCustomer(customerDTO:CustomerDTO):void {
    this.router.navigate([`home/customer/all/${customerDTO.id}`]);
  }
}
