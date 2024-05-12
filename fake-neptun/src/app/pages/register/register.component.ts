import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  data: boolean = !!localStorage.getItem('token');

  emailForNew: string = '';

  register = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordagain: new FormControl('')
  });

  constructor(private auth: AuthService) {
    this.data = !!localStorage.getItem('token');
    this.emailForNew = localStorage.getItem('token') as string;
  }

  ngOnInit(): void {
    this.data = !!localStorage.getItem('token');
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addUser() {
    if (this.register.value.email == '') {
      alert('Add meg az email címedet');
      return;
    }
    if (this.register.value.password == '' && this.register.value.passwordagain == '') {
      alert('Add meg kétszer a jelszavadat');
      return;
    }

    if (this.register.value.password != this.register.value.passwordagain) {
      alert('Kérlek ugyanazt a jelszót add meg!');
      return;
    }

    this.auth.register(this.register.value.email as string, this.register.value.password as string).then(cred => {
      localStorage.setItem('token', this.register.value.email as string)
      alert('Sikeres regisztráció!');

      window.location.reload();
    }).catch(error => {
      alert('Sikertelen regisztráció, próbálj meg másik emailt!');
    });
    this.data = !!localStorage.getItem('token');



  }
  getEmail(): string {
    return localStorage.getItem('token') as string;
  }
}
