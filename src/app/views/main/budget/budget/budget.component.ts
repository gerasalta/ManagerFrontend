import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

  public budgetForm: FormGroup = new FormGroup({
    client: new FormControl(null, [Validators.required]),
    items: new FormArray([])
  })

  public arrayItems = this.budgetForm.get('items') as FormArray

  constructor(
    public fb: FormBuilder
  ){}

  ngOnInit(){
    this.addItem()
  }

  createNewItemForm(){
    return this.fb.group({
      item: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    })
  }

  addItem(){
    const form = this.budgetForm.get('items') as FormArray
    form.push(this.createNewItemForm())
  }

  downloadFile(){
    console.log(this.budgetForm.value)
  }

  clearForm(){
    this.budgetForm.reset()
  }

  deleteItem(index: number){
    this.arrayItems.removeAt(index)
  }

}
