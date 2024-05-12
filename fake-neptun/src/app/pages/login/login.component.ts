import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { StudentService } from '../../shared/students/students.service';
import { TheachersService } from '../../shared/teachers/theachers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  constructor(
    private auth: AuthService, private router: Router, private studentService: StudentService,
    private teacherService: TheachersService
  ) {
    if (this.auth.IsLoggenIn())
      this.router.navigate(['/main']);
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async loginUser() {
    if (this.login.value.email == '') {
      alert('Add meg az email címedet');
      return;
    }
    if (this.login.value.password == '') {
      alert('Add meg a jelszavadat');
      return;
    }
    this.subscriptions.add(await this.auth.login(this.login.value.email as string, this.login.value.password as string).then(cred => {
      this.subscriptions.add(this.studentService.getStudentByEmail(this.login.value.email as string).subscribe(data => {
        if (data[0] != null) {
          localStorage.setItem('jog', 'Hallgató');
          localStorage.setItem('token', data[0].id)
          alert('Sikeres bejelentkezés');
          this.router.navigate(['/main']);
        } else {
          this.subscriptions.add(this.teacherService.getTeacherByEmail(this.login.value.email as string).subscribe(data => {
            if (data[0] != null) {
              localStorage.setItem('jog', 'Oktató');
              localStorage.setItem('token', data[0].id);
              alert('Sikeres bejelentkezés');
              this.router.navigate(['/main']);
            } else {
              alert('Még nincs kész a profilod!');
              this.router.navigate(['/register']);
              window.location.reload();
            }

          }))
        }

      }))

    }).catch(error => {
      alert("Sikertelen bejelentkezés")
    })
    )
  }
}
