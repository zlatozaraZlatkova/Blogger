import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, switchMap, take } from 'rxjs/operators';

import { GoogleAuthService } from 'src/app/services/google-auth.service';
import { GoogleDriveApiService } from 'src/app/services/google-drive-api.service';


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
    private gapiService: GoogleDriveApiService
  ) { }

  onFileSelected($event: Event): void {
    const target = $event.currentTarget as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;
    this.uploadError = null;
    //console.log('File selected:', this.selectedFile.name);

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
    //console.log('Starting Google Sign-in...');

    this.googleAuth.googleSignIn$().subscribe({
      next: (token) => {
        //console.log('Successful sign-in! Token:', token);
        this.uploadError = null;
      },
      error: (error) => {
        console.error('Error signing in:', error);
        this.uploadError = 'Failed to sign in to Google.';
      },
    });
  }


 onUploadToGoogleDrive(): void {
    const accessToken = this.googleAuth.getAccessToken();

    if (!accessToken) {
      this.uploadError = 'Please sign in to Google first.';
      return;
    }

    if (!this.selectedFile) {
      this.uploadError = 'Please select a file first.';
      return;
    }

    this.isUploading = true;
    this.uploadError = null;

    const formData = this.createFormDataForUpload();

    this.gapiService.uploadDriveImage(formData, accessToken).pipe(
      take(1),
      switchMap((uploadResponse) => {
        return this.gapiService.makeFilePublic(uploadResponse.id, accessToken).pipe(
          map(() => uploadResponse)
        );
      })
    ).subscribe({
      next: (uploadResponse) => {
        const driveUrl = `https://lh3.googleusercontent.com/d/${uploadResponse.id}`;
        this.updateFormWithImageUrl(driveUrl);
      },
      error: (error) => {
        console.error('Complete error:', error);
        this.uploadError = 'Failed to upload file or make it public.';
        this.isUploading = false;
      }
    });
  }


  private createFormDataForUpload(): FormData {
    const timestamp = Date.now();
    const originalName = this.selectedFile!.name;
    const uniqueName = `blog-image-${timestamp}-${originalName}`;

    if (!this.selectedFile) {
      throw new Error('No file selected');
    }

    const googleFileInfo = {
      name: uniqueName,
      parents: [],  //main folder 
      role: 'reader',
      type: 'anyone'

    };

    //Google: "metadata === JSON blob ([textJSON], { MIME type})
    const infoAsText = JSON.stringify(googleFileInfo);
    const infoForGoogle = new Blob([infoAsText], { type: 'application/json' });


    const formData = new FormData();
    //multipart
    formData.append('metadata', infoForGoogle);
    formData.append('file', this.selectedFile);

    return formData;
  }


  private updateFormWithImageUrl(imageUrl: string): void {

    this.parentForm.patchValue({
      postImageUrl: imageUrl,
    });

    this.parentForm.get('postImageUrl')?.markAsTouched();
  }

  onRemoveImage(): void {
    this.previewUrl = null;
    this.selectedFile = null;
    this.uploadError = null;
    this.isUploading = false;
    this.fileInput.nativeElement.value = '';

    this.updateFormWithImageUrl('');
  }


  isSignedIn(): boolean {
    return !!this.googleAuth.getAccessToken();
  }
}
