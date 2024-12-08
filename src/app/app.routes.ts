import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ViewUsersComponent } from './view-users/view-users.component';

export const routes: Routes = [

    {path:'', component:RegisterComponent,title:'Register Page'},
    {path:'view-users', component:ViewUsersComponent,title:'Employees page'},


];
