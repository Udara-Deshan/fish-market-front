import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../auth/authentication.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public isMenuOpen = true;
  @Output() event = new EventEmitter<boolean>();
  user: string | undefined;
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.user=this.authenticationService.getCurrentUser?.userType;
  }
  sendNavState(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.event.emit(this.isMenuOpen);
  }

  logout() {
    this.authenticationService.logout();
  }
}
