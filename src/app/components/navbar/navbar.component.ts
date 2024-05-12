import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet,MatToolbarModule, MatButtonModule, MatIconModule,MatGridListModule, MatMenuModule,RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public publicUserService: UsersService;
username:string;
constructor(private userService: UsersService){
  const userString = localStorage.getItem("user");

  if (userString) {
    this.username=`hello ${JSON.parse(userString).user.username}`;      
  }
  else
  this.username='guest';
  this.publicUserService=userService;
}
logOut(){
  this.userService.isGuest=true;
  localStorage.clear();
  window.location.reload();
}
}
