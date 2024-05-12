import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private auth: AuthService) { }
  logout() {
    this.auth.logout();
  }
  loggedIn() {
    return this.auth.IsLoggenIn();
  }
  isStudent() {
    return window.localStorage.getItem('jog') == 'Hallgató';
  }
}
