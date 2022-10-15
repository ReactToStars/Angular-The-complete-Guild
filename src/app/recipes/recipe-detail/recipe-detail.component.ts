import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  visibility:string = 'hidden';
  @Input() recipe:Recipe = new Recipe('', '', '');
  constructor() {}

  ngOnInit(): void {
  }

  dropdownMenu():void{
    if(this.visibility === 'hidden'){
      this.visibility = 'visible';
    }else{
      this.visibility = 'hidden';
    }
  }


}
