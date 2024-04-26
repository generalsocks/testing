import { AuthGuard } from './app/auth.guard';
import { FeaturesComponent } from './app/features/features.component';
import {HomeComponent} from './app/home/home.component'
import { LoginComponent } from './app/login/login.component';
import { Routes } from '@angular/router';
import { SyncCeremonyComponent } from './app/syncceremony/syncceremony.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'features', component: FeaturesComponent, canActivate: [AuthGuard]},
    {path: 'syncceremony', component: SyncCeremonyComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'login'}
];