import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './components/restaurants/restaurant-list/restaurant-list.component';
import { AddRestaurantComponent } from './components/restaurants/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './components/restaurants/edit-restaurant/edit-restaurant.component';
import { ViewRestaurantComponent } from './components/restaurants/view-restaurant/view-restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantListComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
