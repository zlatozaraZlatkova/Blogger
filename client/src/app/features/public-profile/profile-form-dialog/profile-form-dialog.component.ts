import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogData } from 'src/app/interfaces/dialogData';
import { ICreateProfileDto, IProfile } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-profile-form-dialog',
  templateUrl: './profile-form-dialog.component.html',
  styleUrls: ['./profile-form-dialog.component.css'],
})
export class ProfileFormDialogComponent implements OnInit {
  createProfileForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProfileFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public profileData: IDialogData,
  ) { }

  ngOnInit() {
    this.isEditMode = this.profileData.mode === 'edit';
    this.initializeForm();

    if (this.isEditMode && this.profileData.data) {
      this.populateForm(this.profileData.data);
    }
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

  private populateForm(profile: IProfile): void {
    this.createProfileForm.patchValue({
      bio: profile.bio,
      githubUsername: profile.githubUsername,
      linkedin: profile.socialMedia?.linkedin
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
        socialMedia: {
          linkedin: formValue.linkedin?.trim()
        }
      };

      this.dialogRef.close(profileData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
