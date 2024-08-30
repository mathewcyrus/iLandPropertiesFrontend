import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SinglePropertyComponent } from './single-property/single-property.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'properties/:id',
    component: SinglePropertyComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
];
