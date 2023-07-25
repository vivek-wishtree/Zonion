import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant.model';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[] = [];
  isAdmin: boolean = false;
  constructor(private restaurantService: RestaurantsService, private toastr: ToastrService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (userInfo) => {
        if (userInfo && userInfo.role === 'Admin') {
          this.isAdmin = true;
          this.fetchAllRestaurants();
        } else {
          console.log("Else method called");
          this.fetchOpenRestaurants();
        }
      },
      (error) => {
        console.log('Error fetching user info:', error);
      }
    );
  }

  fetchAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(

      (restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
        console.log(this.restaurants);

      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  fetchOpenRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      (restaurants: Restaurant[]) => {
        // Get the current time
        const currentTime = new Date().toLocaleTimeString();
        console.log(this.restaurants);

        // Filter open restaurants based on the opening and closing times
        this.restaurants = restaurants.filter(
          (restaurant: Restaurant) => {
            // Restaurant model has properties "openTime" and "closingTime"
            const openTime = new Date(`01/01/2000 ${restaurant.openTime}`).toLocaleTimeString();
            const closingTime = new Date(`01/01/2000 ${restaurant.closingTime}`).toLocaleTimeString();
            const currentTimeDate = new Date(`01/01/2000 ${currentTime}`).toLocaleTimeString();

            console.log("a " + typeof (openTime) + " " + typeof (closingTime) + " " + typeof (currentTime));

            return (restaurant.isActive && currentTimeDate >= openTime && currentTimeDate < closingTime);
          }
        );
        console.log("Filtered Restaurants:", this.restaurants);

      },
      (error) => {
        // Handle error if any
        console.error('Error fetching restaurants:', error);
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
          // console.log(restaurant);
        },
        error: (error) => {
          this.toastr.error('Failed to delete restaurant. Please try again.', 'Error');
          console.error('Error deleting restaurant:', error);
        }
      });
    }
  }

}
