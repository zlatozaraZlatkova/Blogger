import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-google-drive-upload',
  templateUrl: './google-drive-upload.component.html',
  styleUrls: ['./google-drive-upload.component.css'],
})
export class GoogleDriveUploadComponent {
  isUploading: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
   @Input() parentForm!: FormGroup;


  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  onFileSelected($event: Event): void {
    const target = $event.currentTarget as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;
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


  onRemoveImage(): void {
    this.previewUrl = null;
    this.fileInput.nativeElement.value = '';
  }
}
