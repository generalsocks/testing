import { ApisComponent } from './apis/apis.component';
import { AuthGuard } from './auth.guard';
import { FeaturesComponent } from './features/features.component';
import {HomeComponent} from './home/home.component'
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { SyncCeremonyComponent } from './syncceremony/syncceremony.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent}, 
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}, 
    {path: 'features', component: FeaturesComponent, canActivate: [AuthGuard]},
    {path: 'sync-ceremony', component: SyncCeremonyComponent, canActivate: [AuthGuard]},
    {path: 'apis', component: ApisComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'login'}
];


