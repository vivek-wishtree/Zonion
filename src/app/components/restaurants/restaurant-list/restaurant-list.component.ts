import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[] = [];
  pageSize: number = 4;
  pagedRestaurants: Restaurant[] = [];
  p: number = 1; // Initial page number


  isAdmin: boolean = false;
  itemsPerPage = 4;

  constructor(
    private restaurantService: RestaurantsService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private datePipe: DatePipe
  ) { }


  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (userInfo) => {
        this.isAdmin = userInfo && userInfo.role === 'Admin';
        this.fetchRestaurants();
      },
      (error) => {
        console.log('Error fetching user info:', error);
      }
    );
  }

  fetchRestaurants() {
    // Fetch the restaurants based on user role
    const fetchFn = this.isAdmin ? this.fetchAllRestaurants : this.fetchOpenRestaurants;
    fetchFn.call(this);
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

  formatTimeToISO(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }


  fetchOpenRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      (restaurants: Restaurant[]) => {
        // Get the current time

        this.restaurants = restaurants.filter(
          (restaurant: Restaurant) => {
            var currentTime = new Date().toTimeString();

            var open = this.formatTime(restaurant.openTime); 
            var close = this.formatTime(restaurant.closingTime); 
            
            console.log(open + " ----- " + close + " ");
            //console.log(OpentimePart <= timePart);
            //console.log(closingTimePart > timePart);

            return (restaurant.isActive && open <= currentTime && close > currentTime);
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

  restaurantOpenCheck(restaurant: any) {
    var currentTime = new Date().toTimeString();

    var open = this.formatTime(restaurant.openTime); 
    var close = this.formatTime(restaurant.closingTime); 
    
    console.log(open + " ----- " + close + " ");
    //console.log(OpentimePart <= timePart);
    //console.log(closingTimePart > timePart);

    return (restaurant.isActive && open <= currentTime && close > currentTime);
  }


  formatTime(time: Date): string {
 
    const isoTimeString = time + 'Z';

    // Convert the ISO string to a Date object
    const dateObj = new Date(isoTimeString);
    
  
    // Format the Date object to a short time format (e.g., "hh:mm AM/PM")
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false  });
    
    return formattedTime;
    
  }



}
