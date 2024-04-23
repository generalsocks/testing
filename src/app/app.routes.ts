import { AuthGuard } from './auth.guard';
import {HomeComponent} from './home/home.component'
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent}, 
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}, 
    {path: '**', redirectTo: 'login'}
];
