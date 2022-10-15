import { Component, EventEmitter, OnInit, Output, ViewChild, Input, ElementRef } from '@angular/core';
import { ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name') name:any; //ElementRef
  @ViewChild('amount') amount:any;
  @Output() ingredientEmit = new EventEmitter<ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  add():void{
    const name = this.name.nativeElement.value;
    const amount = this.amount.nativeElement.value;
    this.ingredientEmit.emit(new ingredient(name, amount));
  }

}
