import {Component, Input, OnInit} from '@angular/core';
import {MenuDTO} from "./models/MenuDTO";
import {NavData} from "../../../../assets/nav-data/NavData";
import {ReportsService} from "../../common/service/reports.service";


@Component({
  selector: 'app-left-side-nav-bar',
  templateUrl: './left-side-nav-bar.component.html',
  styleUrls: ['./left-side-nav-bar.component.scss']
})
export class LeftSideNavBarComponent implements OnInit {

  @Input() navState = true;
  currentMenus: MenuDTO [] = NavData;

  constructor(private reportsService: ReportsService) {

  }

  ngOnInit(): void {
  }

  getReports(type: string) {
    this.reportsService.getReport(type).subscribe(res => {
      let blob = new Blob([res], {type: 'application/pdf'});
      let pdfUrl = window.URL.createObjectURL(blob);
      window.open(pdfUrl);
    })
  }
}

