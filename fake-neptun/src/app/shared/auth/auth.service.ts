import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Observable, catchError, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireauth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    });
  }

  IsLoggenIn() {
    // return this.fireauth.user;
    return !!localStorage.getItem('token');
  }
  IsLoggenInpRroperly() {
    // return this.fireauth.user;
    return !!localStorage.getItem('jog');
  }
  deleteUser() {
    this.fireauth.currentUser.then(user => user?.delete());
    localStorage.clear();
  }
}
