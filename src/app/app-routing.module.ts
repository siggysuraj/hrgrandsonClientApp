import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserRegisterComponent} from './user-register/user-register.component';
import {UserLoginComponent} from './user-register/login.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path:  'register', component:UserRegisterComponent},
  {path:  'users', component:UserDetailsComponent},
  {path:  'login', component:UserLoginComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
