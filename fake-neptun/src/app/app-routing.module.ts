import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './shared/auth-guard/auth-guard.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule), canActivate: [authGuardGuard] },
  { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'timetable', loadChildren: () => import('./pages/timetable/timetable.module').then(m => m.TimetableModule), canActivate: [authGuardGuard] },
  { path: 'courses', loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule), canActivate: [authGuardGuard] },
  { path: 'grades', loadChildren: () => import('./pages/grades/grades.module').then(m => m.GradesModule), canActivate: [authGuardGuard] },
  { path: 'mydatas', loadChildren: () => import('./pages/mydatas/mydatas.module').then(m => m.MydatasModule), canActivate: [authGuardGuard] },
  { path: '**', redirectTo: 'not-found' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
