import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CoolingRoomDTO} from "../../../../core/common/dto/CoolingRoomDTO";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SystemConfig} from "../../../../../assets/temp/SystemConfig";
import {ApprovalDialogComponent} from "../../../../core/dialogs/approval-dialog/approval-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/approval-dialog/model/ApprovalDialogConfig";
import {CoolingRoomService} from "../../../../core/common/service/cooling-room.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-all-cooling-rooms',
  templateUrl: './all-cooling-rooms.component.html',
  styleUrls: ['./all-cooling-rooms.component.scss']
})
export class AllCoolingRoomsComponent implements OnInit {
  displayedColumns: string[] = [ 'id','roomNumber','roomTypeId','action'];
  dataSource: MatTableDataSource<Array<CoolingRoomDTO>>;
  coolingRooms!: Array<CoolingRoomDTO>[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tempPageEvent!: PageEvent;

  pageSizeOptions: number[];
  stateFilter = new FormControl(1);

  constructor(public coolingRoomService: CoolingRoomService,
              public dialog:MatDialog,
              private router:Router,
  ) {
    this.pageSizeOptions = SystemConfig.getPageSizes();
    this.dataSource = new MatTableDataSource(this.coolingRooms);
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
    this.coolingRoomService.getAll(pageIndex, pageSize,this.stateFilter.value)
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

  delete(coolingRoomDTO:CoolingRoomDTO):void {
    const approval = this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure sir you want to delete this coolingRoom?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        this.coolingRoomService.delete(Number(coolingRoomDTO.id)).subscribe(res=>{
          this.refreshTable();
        });
      }
    });
  }

  update(coolingRoomDTO:CoolingRoomDTO):void {
    this.router.navigate([`home/cooling-room/all/${coolingRoomDTO.id}`]);
  }

}
