import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  response: object = {};
  email: string = '';
  hide1 = true;
  hide2 = true;
  error = '';

  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService, private router: Router) {
    activatedRoute.params.subscribe(p => {
      this.email = p['email'];
    })
  }

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormGroup({
      pass1: new FormControl('', [Validators.required,
      Validators.minLength(8),
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")

      ]),
      pass2: new FormControl('', [Validators.required]),
    }),
    city: new FormControl(''),
    street: new FormControl(''),
    houseNumber: new FormControl(''),

  })

  validation(username: HTMLInputElement, email: HTMLInputElement, pass1: HTMLInputElement, pass2: HTMLInputElement, city: HTMLInputElement, street: HTMLInputElement, houseNumber: HTMLInputElement) {
    if (pass1.value != pass2.value)
      this.error = "please confirm your password";
    else {
      this.error = '';
      this.register(username.value, email.value, pass1.value, city.value, street.value, +houseNumber.value)
    }
  }
  register(username: string, email: string, password: string, city: string, street: string, houseNumber: number) {
    //איתחול משתנה השגיאות
    this.error = '';
    let user = { username: username, email: email, password: password, city: city, street: street, houseNumber: houseNumber };

    //נסיון להרשמה
    this.userService.register(user)
      .subscribe(
        //הצלחה
        (u) => this.saveAtLocalStorage(u),
        //כישלון
        (err) => {
          this.error = err.error.error.message;
          //המייל אינו קיים במערכת - נעביר להרשמה
          // if (this.error == "user doesn't exist")
          //   this.router.navigateByUrl(`register/${email}`)
        }
      )

  }
  saveAtLocalStorage(u: User) {
    localStorage.setItem("user", JSON.stringify(u));
    this.userService.isGuest = false;
    this.router.navigateByUrl("allRecipes")
  }
}
