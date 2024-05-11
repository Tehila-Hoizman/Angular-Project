import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  response: object = {};
  error: string = '';
  email:string='';
  hide1 = true;
  hide2 = true;

  constructor(private activatedRoute: ActivatedRoute) {

  activatedRoute.params.subscribe(p => {
    console.log( p['email']);
    
    this.email = p['email'];
  })
}
  register(username:string,email: string, password: string){

  }
}
