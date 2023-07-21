import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[] = [];
  constructor(private restaurantService: RestaurantsService, private toastr:ToastrService,private router: Router) { }

  ngOnInit(): void 
  {
    this.restaurantService.getAllRestaurants()
    .subscribe({
        next: (restaurants) => 
        {
         this.restaurants = restaurants;
        },
        error:(response)=>{
          console.log(response);
        },
      }
    );
  }

  reloadCurrentPage() {
    window.location.reload();
   }

   
   deleteRestaurant(id: any) {
    // Display a confirmation dialog
    const confirmed = confirm('Are you sure you want to delete this restaurant?');
  
    // If the user confirms the deletion
    if (confirmed) {
      this.restaurantService.deleteRestaurant(id).subscribe({
        next: (restaurant) => {
          this.toastr.success('Restaurant Deleted Successfully!', 'Success');
          setTimeout(() => {
            this.reloadCurrentPage();
          }, 2000);
          console.log(restaurant);
        },
        error: (error) => {
          this.toastr.error('Failed to delete restaurant. Please try again.', 'Error');
          console.error('Error updating restaurant:', error);
        }
      });
    }
  }
  

}
