import { Component, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  logo = "assets/images/logo.png";

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
  }

  signOutAdmin() {
    this.oktaAuth.logout('/');
  }
}
