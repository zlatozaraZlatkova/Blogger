import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ICreateProfileDto } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-create-profile-dialog',
  templateUrl: './create-profile-dialog.component.html',
  styleUrls: ['./create-profile-dialog.component.css'],
})
export class CreateProfileDialogComponent implements OnInit {
  createProfileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProfileDialogComponent>
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.createProfileForm = this.fb.group({
      githubUsername: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      linkedin: ['', [Validators.minLength(2), Validators.maxLength(30)]],
      bio: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  onSubmit() {
    if (this.createProfileForm.invalid) {
      return;
    }

    if (this.createProfileForm.valid) {
      const formValue = this.createProfileForm.value;

      const profileData: ICreateProfileDto = {
        bio: formValue.bio.trim(),
        githubUsername: formValue.githubUsername.trim(),
        linkedin: formValue.linkedin?.trim(),
      };

      this.dialogRef.close(profileData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
