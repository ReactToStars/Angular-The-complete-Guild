import { Component, EventEmitter, OnInit, Output, ViewChild, Input, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('name') name:any; //ElementRef
  // @ViewChild('amount') amount:any;
  @ViewChild('f') slForm: NgForm = new NgForm([], []); 
  subscription: Subscription = new Subscription();
  editMode= false;
  editedIndexItem: number = 0;
  editedItem: Ingredient = new Ingredient('', 0);
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index:number)=> {
          this.editedIndexItem = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  // add():void{
  //   const name = this.name.nativeElement.value;
  //   const amount = this.amount.nativeElement.value;
  //   const newIngredient = new Ingredient(name, amount);
  //   this.shoppingListService.addIngredient(newIngredient);
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedIndexItem, newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedIndexItem);
    this.onClear();
  }

}
