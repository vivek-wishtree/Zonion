import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './components/restaurants/restaurant-list/restaurant-list.component';
import { AddRestaurantComponent } from './components/restaurants/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './components/restaurants/edit-restaurant/edit-restaurant.component';
import { ViewRestaurantComponent } from './components/restaurants/view-restaurant/view-restaurant.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'restaurants',
    component: RestaurantListComponent
  }
  ,
  {
    path: 'restaurants/add',
    component: AddRestaurantComponent
  },
  {
    path: 'restaurants/edit/:id',
    component: EditRestaurantComponent
  },
  {
    path: 'restaurants/view/:id',
    component: ViewRestaurantComponent
  },
  { path: 'login', component: LoginComponent }, // Add the login route
  { path: 'signup', component: SignupComponent }, // Add the signup route
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
