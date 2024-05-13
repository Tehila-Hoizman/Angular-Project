import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories: Category[]=[];
  private baseUrl = 'http://localhost:5000/categories';
  
    constructor(private http: HttpClient) { }
    get categories(){
      return this.http.get<Category[]>(this.baseUrl)
    }
  
}
