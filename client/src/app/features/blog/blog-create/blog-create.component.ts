import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/internal/operators/take';

import { BlogService } from '../blog.service';
import { GoogleDriveConfigService } from 'src/app/services/google-drive-config.service';
import { ICreatePostDto } from 'src/app/interfaces/post';

interface IServerResponse {
  message: string;
}

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent implements OnInit {
  postForm!: FormGroup;
  errResponseMsg!: IServerResponse;
  configLoaded: boolean = false;
  isUploading: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private googleDriveConfigService: GoogleDriveConfigService
  ) { }

  ngOnInit(): void {
    this.initializeGoogleDriveConfig();
    this.loadGapiScript();
    this.initializeForm();
  }

  private initializeGoogleDriveConfig(): void {
    this.googleDriveConfigService
      .loadConfig()
      .pipe(take(1))
      .subscribe({
        next: (config) => {
          this.configLoaded = true;
          console.log('Google Drive config:', config);
        },
        error: (err: HttpErrorResponse) => {
          const errorResponse = err.error as IServerResponse;
          this.errResponseMsg = errorResponse;
          console.error('Error google drive config:', this.errResponseMsg);
        },
      });
  }

  private loadGapiScript(): Promise<void> {
    return this.googleDriveConfigService.loadGoogleApiScript();
  }

  private initializeForm(): void {
    this.postForm = this.fb.group({
      postTitle: ['', [Validators.required, Validators.maxLength(150)]],
      postImageUrl: ['', Validators.required],
      postCategory: ['', Validators.required],
      postText: ['', [Validators.required, Validators.maxLength(3000)]],
      postTags: ['', Validators.required],
    });
  }

  handleFormSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    console.log('Form is submitted', this.postForm.value);

    const formData = this.postForm.value;

    const postData: ICreatePostDto = {
      postTitle: formData.postTitle,
      postImageUrl: formData.postImageUrl,
      postCategory: formData.postCategory,
      postText: formData.postText,
      postTags: formData.postTags,
    };

    this.blogService.createPost(postData).subscribe({
      next: (createdPost) => {
        console.log('Post created successfully:', createdPost);
        this.router.navigate([`/posts/${createdPost._id}`]);
      },
      error: (err: HttpErrorResponse) => {
        const errorResponse = err.error as IServerResponse;
        this.errResponseMsg = errorResponse;
        console.error('ErrorMsg creating post:', this.errResponseMsg);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/posts']);
  }


  onFileSelected($event: Event): void {
    const target = $event.currentTarget as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;
    console.log('File selected:', this.selectedFile.name);

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



