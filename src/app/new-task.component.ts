import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-task',
  template: `
    <p>
      Enter the new task text in the following field:
    </p>
    <mat-card-content>
      <form ngForm class="example-form">
        <mat-form-field class="example-full-width">
          <input
            matInput
            placeholder="New Task"
            [(ngModel)]="data"
            [ngModelOptions]="{standalone: true}">
        </mat-form-field>
          <button
              mat-button
              type="submit"
              (click)="onSubmit($event)"
              routerLink="main-window"
          >
              Submit
          </button>
      </form>

    </mat-card-content>
  `,
  styles: [`
    mat-card {
      padding: 20px;
      width: 90%;
    }
    button {
      margin: 0 10px;
    }
  `]
})
export class NewTaskComponent implements OnInit {
  @Input() taskContent!: string;

  constructor(
    public dialogRef: MatDialogRef<NewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string | undefined = undefined
  ) { }

  ngOnInit(): void {
  }

  onSubmit(e: any){
    e.preventDefault();
    this.dialogRef.close(this.data)
  }

}
