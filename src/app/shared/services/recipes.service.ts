import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
private _recipes: Recipe[]=[];
private baseUrl = 'http://localhost:5000/recipes';

  constructor(private http: HttpClient) { }
  get recipes(){
    return this.http.get<Recipe[]>(this.baseUrl)
  }

getRecipesByPageNumber(page:number, perPage:number){
  return this.http.get<Recipe[]>(`${this.baseUrl}?perPage=${perPage}&page=${page}`)
}
}
