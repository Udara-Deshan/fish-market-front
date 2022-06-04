import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CoolingRoomTypeDTO} from "../../../../core/common/dto/CoolingRoomTypeDTO";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SystemConfig} from "../../../../../assets/temp/SystemConfig";
import {ApprovalDialogComponent} from "../../../../core/dialogs/approval-dialog/approval-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/approval-dialog/model/ApprovalDialogConfig";
import {CoolingRoomTypeService} from "../../../../core/common/service/cooling-room-type.service";

@Component({
  selector: 'app-all-cooling-room-types',
  templateUrl: './all-cooling-room-types.component.html',
  styleUrls: ['./all-cooling-room-types.component.scss']
})
export class AllCoolingRoomTypesComponent implements OnInit {

  displayedColumns: string[] = [ 'id','typeName','typePrice','action'];
  dataSource: MatTableDataSource<Array<CoolingRoomTypeDTO>>;
  coolingRoomTypes!: Array<CoolingRoomTypeDTO>[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tempPageEvent!: PageEvent;

  pageSizeOptions: number[];

  constructor(public coolingRoomTypeService: CoolingRoomTypeService,
              public dialog:MatDialog,
              private router:Router,
  ) {
    this.pageSizeOptions = SystemConfig.getPageSizes();
    this.dataSource = new MatTableDataSource(this.coolingRoomTypes);
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
    this.coolingRoomTypeService.getAll(pageIndex, pageSize)
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

  delete(coolingRoomTypeDTO:CoolingRoomTypeDTO):void {
    const approval = this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure sir you want to delete this coolingRoomType?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        this.coolingRoomTypeService.delete(Number(coolingRoomTypeDTO.id)).subscribe(res=>{
          this.refreshTable();
        });
      }
    });
  }

  update(coolingRoomTypeDTO:CoolingRoomTypeDTO):void {
    this.router.navigate([`home/cooling-room/type/all/${coolingRoomTypeDTO.id}`]);
  }


}
