import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantsService } from 'src/app/services/restaurants.service';


@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  addRestaurantRequest :Restaurant={
    name: '',
    phone: '',
    address: '',
    openTime: '',
    closingTime: '',
    isActive: false,
    restaurantId: 0,
    menuImageUrl: ''
  }
  constructor(private restaurantService: RestaurantsService, private router: Router,private toastr: ToastrService) {}
  ngOnInit(): void {
    
  }
  phoneNumberPattern = /^[789]\d{9}$/;

  //Custom Validator for phone number
  phoneNumberValidator(control: FormControl): { [key: string]: any } | null {
    if (!this.phoneNumberPattern.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }


    // Custom validator for menu image
    menuImageValidator(control: FormControl): { [key: string]: any } | null {
      // Check if a file is selected
      if (control.value === null || control.value.length === 0) {
        return { required: true };
      }
      return null;
    }
  addRestaurant(form:NgForm) {

    if (form.invalid) {
      
      return;
    }
    this.addRestaurantRequest.isActive = true;
    this.restaurantService.addRestaurant(this.addRestaurantRequest).subscribe({
      next: (restaurant) => {
        console.log(restaurant);
        this.toastr.success('Restaurant added successfully!', 'Success');
        this.router.navigate(['restaurants']);
        console.log(restaurant);
      },
      error: (error) => {
        this.toastr.error('Failed to add restaurant. Please try again.', 'Error');
        this.router.navigate(['restaurants']);
        console.error('Error adding restaurant:', error);
      }
    });
  }
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
  
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.restaurantService.uploadImage(file).subscribe(
        (response: any) => {
          this.toastr.success('Image uploaded successfully.', 'Success');
          this.addRestaurantRequest.menuImageUrl = response.menuImageUrl;
        },
        (error) => {
          this.toastr.error('Failed to upload image. Please try again.', 'Error');
          console.error('Error uploading image:', error);
        }
      );
    }
  }
  
  
  

}
