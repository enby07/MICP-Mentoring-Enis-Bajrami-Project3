import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string;
  password: string;
  message: string;
  userId: number;
  userRole: number;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    // this.route.paramMap.subscribe((params) => {
    //   const idParam = params.get('id');
      
    //   if (idParam !== null) {
    //     this.userId = +idParam;
    //     this.getUserRole();
    //   }
    // });
  }
  // ngOnInit(): void {
  //   this.route.paramMap.subscribe((params) => {
  //     this.userId = +!params.get('id');
  //     this.getUserRole();
  //   });
  // }

  getUserRole(){
   this.authService.getRole(this.userId).subscribe(
      (data) => {
       this.userRole = data.role;
      });
    }
  // ngOnInit() {
  //   this.initForm();
  // }

  // initForm() {
  //   this.loginForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required],
  //   });
  // }

  // getUserRole(){
  //   this.authService.getRole().subscribe((role)=>{
  //     this.role = this.role;
  //     console.log(role);
      
  //   });
  // }



  // role = this.authService.getUserRole

  

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (data) => {
        //console.log(data + "from onSubmit it LOGGIN " +  this.userRole);
        //console.log();
        this.message = 'Login successful!';
        //const role = data.
        //this.getUserRole();
        // if(data.role == 1)
        //   this.router.navigate(['/admin']);
        if (this.userRole == 1 ) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);          
        }
      },
      (error) => {
        console.log(error, " Error at submit");
        console.log(this.username, this.password);        
        this.message = 'Invalid username or password.';
      }
    );
  }
}
