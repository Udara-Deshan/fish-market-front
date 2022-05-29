import {Component, Input, OnInit} from '@angular/core';
import {ProgressSpinnerService} from "./progress-spinner.service";

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {
  @Input() mode:'FORM'|'TABLE'='FORM';
  constructor(public progressSpinnerService:ProgressSpinnerService) { }

  ngOnInit(): void {
  }

}
