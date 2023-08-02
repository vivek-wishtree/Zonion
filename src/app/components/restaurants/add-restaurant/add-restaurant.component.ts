import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant.model';
import { UserInfo } from 'src/app/models/user-info';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit 
{

    
    addRestaurantRequest:Restaurant = {
      name: '',
      phone: '',
      address: '',
      restaurantId: 0,
      menuImageUrl: '',
      createdById: 0,
      isActive: false,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
      openTime: '',
      closingTime: ''
    };

  constructor(
    private restaurantService: RestaurantsService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {

  
  }
  phoneNumberPattern = /^[789]\d{9}$/;

  // Custom Validator for phone number
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
    // Check if the selected file is an image
    const file = control.value[0];
    if (!file.type.startsWith('image/')) {
      return { invalidImageFormat: true };
    }
    return null;
  }

  Space(event : any){
    if(event.target.selectionStart === 0 && event.code === "Space"){
      event.preventDefault();
    }
  }

  removeTrailingSpaces(): void {
    if (this.addRestaurantRequest.name) {
      this.addRestaurantRequest.name = this.addRestaurantRequest.name.trim();
    }
  }

  addRestaurant(form: NgForm) 
  {
    if (form.invalid) {
      return;
    }

    this.addRestaurantRequest.isActive = true;
    console.log("Add called");
    // this.addRestaurantRequest.openTime = this.addRestaurantRequest.openTime.toLocaleString();
    // this.addRestaurantRequest.closingTime = this.addRestaurantRequest.closingTime.toLocaleString();
    console.log("Before conversion : "+this.addRestaurantRequest.openTime);
    console.log(this.addRestaurantRequest.closingTime);

    this.addRestaurantRequest.openTime = (new Date(`01/01/2000 ${this.addRestaurantRequest.openTime}`));
    this.addRestaurantRequest.closingTime = (new Date(`01/01/2000 ${this.addRestaurantRequest.closingTime}`));

    console.log(this.addRestaurantRequest.openTime);
    console.log(this.addRestaurantRequest.closingTime);

    
    

   
    this.restaurantService.addRestaurant(this.addRestaurantRequest).subscribe({
      next: (restaurant) => {
        console.log("Inside Service..");
        
        console.log(restaurant.openTime);
        console.log(restaurant.closingTime);
        this.toastr.success('Restaurant added successfully!', 'Success');
        this.router.navigate(['restaurants']);
        // console.log(restaurant);
      },
      error: (error) => {
        this.toastr.error('Failed to add restaurant. Please try again.', 'Error');
        this.router.navigate(['restaurants']);
        console.log('Error adding restaurant:', error);
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