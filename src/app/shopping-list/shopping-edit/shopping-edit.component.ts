import { Component, EventEmitter, OnInit, Output, ViewChild, Input, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name') name:any; //ElementRef
  @ViewChild('amount') amount:any;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  }

  add():void{
    const name = this.name.nativeElement.value;
    const amount = this.amount.nativeElement.value;
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }

}
