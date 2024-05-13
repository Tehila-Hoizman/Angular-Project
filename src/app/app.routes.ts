import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent), pathMatch: 'full' },
    { path: 'all-recipes', loadComponent: () => import('./pages/all-recipes/all-recipes.component').then(f => f.AllRecipesComponent) },
    { path: 'register', loadComponent: () => import('./pages/register/register.component').then(f => f.RegisterComponent) },
    { path: 'register/:email', loadComponent: () => import('./pages/register/register.component').then(f => f.RegisterComponent) },
    { path: '**', loadComponent: () => import('./pages/register/register.component').then(f => f.RegisterComponent) },
    // { path: 'products', loadComponent: () => import('./pages/list/list.component').then(f => f.ListComponent) },


];
