import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfirmDialogData } from 'src/app/interfaces/dialogData';
import { emailValidator } from '../validators/email-validator';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  emailForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
    });
  }

  onConfirm(): void {
    if (this.data.emailInputTag && this.emailForm.invalid) {
      return;

    } else if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;

      this.dialogRef.close(email);

    } else {
      this.dialogRef.close(true);
    }


  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
