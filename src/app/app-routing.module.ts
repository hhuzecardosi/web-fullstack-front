import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./shared/_helpers/auth-guard.service";

import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
