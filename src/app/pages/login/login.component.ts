import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { User } from '../../shared/models/user';
import { UsersService } from '../../shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  response: object = {};
  error: string = '';
  constructor(private userService: UsersService, private router: Router) { }
  hide = true;

  login(email: string, password: string) {
    //איתחול משתנה השגיאות
    this.error = '';
    //נסיון להתחברות
    this.userService.login({ email: email, password: password })
      .subscribe(
        //הצלחה
        (u) => this.saveAtLocalStorage(u),
        //כישלון
        (err) => {
          this.error = err.error.error.message;
          //המייל אינו קיים במערכת - נעביר להרשמה
          if (this.error == "user doesn't exist")
            this.router.navigateByUrl(`register/${email}`)
        }
      )

  }
  saveAtLocalStorage(u: User) {
    localStorage.setItem("user", JSON.stringify(u));
    this.router.navigateByUrl("allRecipes")
  }
}
