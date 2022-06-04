import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StockService} from "../../../../core/common/service/stock.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SystemConfig} from "../../../../../assets/temp/SystemConfig";
import {ApprovalDialogComponent} from "../../../../core/dialogs/approval-dialog/approval-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/approval-dialog/model/ApprovalDialogConfig";
import {TokenDTO} from "../../../../core/common/dto/StockDTO";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-all-stocks',
  templateUrl: './all-stocks.component.html',
  styleUrls: ['./all-stocks.component.scss']
})
export class AllStocksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'whoIssued', 'createDate', 'customerId', 'customerName','action'];
  dataSource: MatTableDataSource<TokenDTO>;
  stocks!: TokenDTO[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tempPageEvent!: PageEvent;

  pageSizeOptions: number[];
  searchKeyWord=new FormControl();

  constructor(public stockService: StockService,
              public dialog: MatDialog,
              private router: Router,
  ) {
    this.pageSizeOptions = SystemConfig.getPageSizes();
    this.dataSource = new MatTableDataSource(this.stocks);
    this.dataSource.paginator = this.paginator;

  }

  updatePermissions() {

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
    console.log(this.searchKeyWord.value)
    this.loadTable(this.paginator.pageIndex, this.paginator.pageSize,this.searchKeyWord.value);
  }

  public loadTable(pageIndex: number, pageSize: number, search: number): void {
    this.stockService.getAll(pageIndex, pageSize,search)
      .subscribe(result => {
        console.log(result);
        this.paginator.length = result.data.length;
        this.dataSource = result.data;
      }, error => {
        console.log(error);
      });
  }

  public getServerData(event: PageEvent): any {
    this.loadTable(event.pageIndex, event.pageSize, this.searchKeyWord.value);
  }

  delete(tokenDTO: TokenDTO): void {
    const approval = this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to delete this stock?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        this.stockService.delete(Number(tokenDTO.id)).subscribe(res=>{
          this.refreshTable();
        });
      }
    });
  }

  updateStock(tokenDTO: TokenDTO): void {
    this.router.navigate([`home/stock/all/${tokenDTO.id}`]);
  }

  pay(row: TokenDTO) {
    this.stockService.pay(row?.id).subscribe(res => {
      let blob = new Blob([res], {type: 'application/pdf'});
      let pdfUrl = window.URL.createObjectURL(blob);
      console.log(pdfUrl);
      window.open(pdfUrl, 'pdf');
      this.refreshTable();
    })
  }
}
