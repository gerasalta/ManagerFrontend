import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-budget-model',
  templateUrl: './budget-model.component.html',
  styleUrls: ['./budget-model.component.scss']
})
export class BudgetModelComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public items: any,
    public dialogRef: MatDialogRef<BudgetModelComponent>,
  ){}

  ngOnInit(){

  }

  @ViewChild('document', {static: false}) el!: ElementRef;

  downloadFile(){
    const pdf = new jsPDF('p', 'px', 'a4')
    pdf.html(this.el.nativeElement,{
      callback: (pdf) => {
        pdf.save(this.items.client + '.pdf')
      }
    })
    this.dialogRef.close(true)
  }

  setDate(){
    const today = new Date()
    return today.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  setExpirationDate(){
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate()+15);
    return tomorrow.toLocaleDateString('es-MX')
  }

}
