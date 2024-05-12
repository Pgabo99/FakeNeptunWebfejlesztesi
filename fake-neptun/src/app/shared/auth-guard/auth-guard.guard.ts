import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class authGuardGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }


  canActivate() {
    if (this.auth.IsLoggenIn()) {
      if (this.auth.IsLoggenInpRroperly()) {
        return true;
      } else {
        alert("Hoppá! Nincs kész a profilod!");
        this.router.navigate(['/register'])
        return false;
      }
    }

    alert("Hoppá! Nem vagy bejelentkezve!");
    this.router.navigate(['login'])
    return false;
  }
}
