import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  authenticatedUser: string | null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  // ngOnInit() {
  //   this.authenticatedUser = this.authService.getAuthenticatedUser();
  // }

  logout() {
    this.authService.logout();
    // Redirect to the login page upon logout
    this.isLoggedIn = false;
    window.location.href = '/login';
  }
}