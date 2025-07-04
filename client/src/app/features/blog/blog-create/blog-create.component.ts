import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';

import { BlogService } from '../blog.service';
import { GoogleDriveConfigService } from 'src/app/services/google-drive-config.service';
import { ICreatePostDto } from 'src/app/interfaces/post';
import { GoogleAuthService } from 'src/app/services/google-auth.service';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent implements OnInit {
  postForm!: FormGroup; 

  configLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private googleDriveConfigService: GoogleDriveConfigService,
    private googleAuth: GoogleAuthService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.googleLoader();
  }

  googleLoader(): void {
    this.googleDriveConfigService.loadConfig()
      .pipe(
        take(1),
        tap((config) => {
          this.configLoaded = true;
          console.log('Config loaded:', config);
        }),
        switchMap(() => this.googleDriveConfigService.loadGoogleIdentityScript())
      )
      .subscribe({
        next: () => {
          const config = this.googleDriveConfigService.getConfig();
          
          this.googleAuth.initializeOAuthClient(
            config.clientId,
            'https://www.googleapis.com/auth/drive.file'
          );
        },
        error: (err) => {
          console.error('Error loading config or GIS script', err);
        }
      });
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
      error: (err) => {
        console.log('Interceptor err:', err)
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/posts']);
  }
}