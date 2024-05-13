import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Recipe } from '../../shared/models/recipe';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

  @Input('recipe')
  recipe:Recipe|null=null;
  private baseUrl = 'http://localhost:5000/images/';

  getImageUrl(relativeUrl: string|undefined): string {
    console.log(this.baseUrl + relativeUrl);
    
    return this.baseUrl + relativeUrl;
  }
}
