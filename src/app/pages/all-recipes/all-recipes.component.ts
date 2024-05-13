import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../shared/services/recipes.service';
import { Recipe } from '../../shared/models/recipe';
import { RecipeComponent } from '../../components/recipe/recipe.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, JsonPipe } from '@angular/common';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe,MatInputModule,RecipeComponent, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit {
  list: Recipe[] = [];
  categories: Category[] = [];
  toppings = new FormControl('');
  allRecipes: Recipe[] = [];
  toppingList: string[];
  searchByName: string = '';
  preparationTime:string='';
  //Paginator
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    // this.recipesService.getRecipesByPageNumber(this.pageIndex,this.pageSize)
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.list=this.allRecipes.slice((this.pageIndex)*this.pageSize,(this.pageIndex+1)*this.pageSize)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  constructor(private recipesService: RecipesService, private categoryService: CategoryService) {
    this.toppingList = [...this.categories.map(c => c.name)];

  }
  ngOnInit() {
    this.recipesService.recipes
      .subscribe(data => { this.allRecipes = data; this.list =this.allRecipes.slice((this.pageIndex)*this.pageSize,(this.pageIndex+1)*this.pageSize)});
    this.categoryService.categories
      .subscribe(data => { this.categories = data; this.toppingList = [...this.categories.map(c => c.name)]; });
  }

  onSelectionChange(categories: string | string[] | null): void {
    if (categories === null) {
      this.list = this.allRecipes;
      return;
    }
    const selectedCategories = Array.isArray(categories) ? categories : [categories];
    if (selectedCategories.length > 0) {
      this.list = this.allRecipes.filter(recipe => {
        return selectedCategories.some(selectedCategory => recipe.categories.includes(selectedCategory));
      });
    } else {
      this.list = this.allRecipes;
    }
  }
  searchRecipeByName(search: string) {
    this.toppings.setValue(null);
    if (search == '') {
      this.list = this.allRecipes;
    }
    else {
      this.list = this.allRecipes.filter(recipe => {
        return recipe.name.includes(search);
      });
    }
  }
  searchRecipeBypreparationTime(search: string){
    this.toppings.setValue(null);
    if (search == null) {
      this.list = this.allRecipes;
    }else{
      if(+search===0)
        this.list=[];
    
    else {
      this.list = this.allRecipes.filter(recipe => {
        return recipe.preparationTimeInMinute<=+search;
      });
    }}
  }
}
    // let { search, page, perPage } = req.query;
