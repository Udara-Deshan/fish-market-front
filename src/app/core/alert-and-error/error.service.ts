import { Injectable } from '@angular/core';
import {ApprovalDialogComponent} from "../dialogs/approval-dialog/approval-dialog.component";
import {ApprovalDialogConfig} from "../dialogs/approval-dialog/model/ApprovalDialogConfig";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private dialog: MatDialog,
              private authenticationService:AuthenticationService) { }

  handle(error: any): void {
    if (error.status === 400){
      this.handle_400(error);
    }else if (error.status === 401){
      this.handle_401(error);
    }else if (error.status === 404){
      this.handle_404(error);
    }else if (error.status === 500){
      this.handle_500(error);
    } else{
      this.handleDefault(error);
    }
  }
  private handle_400(error: any): void {
    this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      // height: '200px',
      data: new ApprovalDialogConfig('Error', error.error.message, 'Try Again !')
    });
  }
  private handle_404(error: any): void {
    this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      // height: '200px',
      data: new ApprovalDialogConfig('Error', error.error.message, 'Try Again !')
    });
  }
  private handle_401(error: any): void {
    this.dialog.open(ApprovalDialogComponent, {
      width: '450px',
      // height: '200px',
      data: new ApprovalDialogConfig('Error', "Error", "unauthorized access"  )
    }).afterClosed().subscribe(res=>{
      this.authenticationService.logout();
    });
  }
  private handle_500(error: any): void {
    this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      // height: '200px',
      data: new ApprovalDialogConfig('Error', 'Error!', error.error.error)
    });
  }
  private handleDefault(error: any): void {
    this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      // height: '200px',
      data: new ApprovalDialogConfig('Error', 'Error!', 'Please Try Again Shortly!')
    });
  }
}
