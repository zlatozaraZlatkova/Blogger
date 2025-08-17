import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IListDialogData } from 'src/app/interfaces/dialogData';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css'],
})
export class ListDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IListDialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
