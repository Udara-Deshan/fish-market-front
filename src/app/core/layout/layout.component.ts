import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  navSate = true;
  constructor() { }

  ngOnInit(): void {
  }

  receiveNavState($event: boolean): void{
    this.navSate = $event;
  }

}
