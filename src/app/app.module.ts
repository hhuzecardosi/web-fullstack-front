import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import {authInterceptorProviders} from "./shared/_helpers/auth.interceptor";
import {AuthGuard} from "./shared/_helpers/auth-guard.service";
import {HttpClientModule} from "@angular/common/http";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './shared/nav/nav.component';
import {LucideAngularModule, CalendarClock, Home, User, Folders, LogOut, ChevronRight} from "lucide-angular";
import { GamesComponent } from './games/games.component';
import { UserComponent } from './user/user.component';
import { NightResultsComponent } from './night-results/night-results.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    GamesComponent,
    UserComponent,
    NightResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LucideAngularModule.pick({  Home, CalendarClock, User, Folders, LogOut, ChevronRight})
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
