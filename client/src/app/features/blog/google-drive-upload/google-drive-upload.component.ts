import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GoogleAuthService } from 'src/app/services/google-auth.service';


@Component({
  selector: 'app-google-drive-upload',
  templateUrl: './google-drive-upload.component.html',
  styleUrls: ['./google-drive-upload.component.css'],
})
export class GoogleDriveUploadComponent {
  isUploading: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploadError: string | null = null;

  @Input() parentForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private googleAuth: GoogleAuthService,
  ) {}

  onFileSelected($event: Event): void {
    const target = $event.currentTarget as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;
    this.uploadError = null;
    console.log('File selected:', this.selectedFile.name);

    this.generateLocalPreview(file);
  }


  private generateLocalPreview(file: File): void {
    const createLocalPreviewReader = new FileReader();

    createLocalPreviewReader.onload = (e) => {
      const fileUrlStr = e.target?.result as string;
      this.previewUrl = fileUrlStr;
    };

    createLocalPreviewReader.readAsDataURL(file);
  }


  onSignInToGoogle(): void {
    console.log('Starting Google Sign-in...');

    this.googleAuth.googleSignIn$().subscribe({
      next: (token) => {
        console.log('Successful sign-in! Token:', token);
        this.uploadError = null;
      },
      error: (error) => {
        console.error('Error signing in:', error);
        this.uploadError = 'Failed to sign in to Google.';
      },
    });
  }

  onRemoveImage(): void {
    this.previewUrl = null; 
    this.selectedFile = null; 
    this.uploadError = null; 
    this.isUploading = false; 
    this.fileInput.nativeElement.value = ''; 

   
  }


  isSignedIn(): boolean {
    return !!this.googleAuth.getAccessToken();
  }
}
