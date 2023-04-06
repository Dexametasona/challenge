import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"home", component:HomeComponent, canActivate:[LoginGuard], children:[
    {path:"", redirectTo:"inicio", pathMatch:'full'},
    {path:"inicio", component:MainComponent},
    {path:"**", component:NotFoundComponent}
  ]},
  {path:"", redirectTo:"login", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
