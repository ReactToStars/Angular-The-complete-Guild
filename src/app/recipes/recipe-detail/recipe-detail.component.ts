import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  visibility:string = 'hidden';
  // @Input() recipe:Recipe = new Recipe('', '', '', []);
  recipe:Recipe = new Recipe('', '', '', []);
  id:number = 0;

  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      )
  }

  dropdownMenu():void{
    if(this.visibility === 'hidden'){
      this.visibility = 'visible';
    }else{
      this.visibility = 'hidden';
    }
  }

  addToShoppingList(ingredients:Ingredient[]):void{
    this.recipeService.addIngredientsToShoppingList(ingredients);
  }

  onEditRecipe(){
    // this.router.navigate(['edit'], {relativeTo:this.route});
    this.router.navigate(["../", this.id, "edit"], {relativeTo:this.route});
  }
}
