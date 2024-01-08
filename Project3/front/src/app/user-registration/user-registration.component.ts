import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {

  username: string;
  email: string;
  password: string;
  message: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.username, this.email, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.message = 'Registration successful!';
          this.router.navigate(['/login']);
        },
        error => {
         console.log(error);
         console.log(this.message);
          this.message = 'Something Wrong.';
          
          
        });
  }
  
  // registrationForm!: FormGroup;

  // constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  // ngOnInit() {
  //   this.initForm();
  // }

  // initForm() {
  //   this.registrationForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]]
      
      
  //   });

    
  }

  // registerUser() {
  //   const formData = this.registrationForm.value;

  //   this.http.post('http://localhost:3000/user/register', formData).subscribe(response => {
  //     console.log(response);
  //     // Optionally, you can reset the form after successful registration
  //     this.registrationForm.reset();
  //     this.router.navigate(['/login']);
  //   });
  // }
//}
