import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { ICreatePostDto } from 'src/app/interfaces/post';
import { HttpErrorResponse } from '@angular/common/http';

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
  errResonseMsg!: IServerResponse;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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
        this.errResonseMsg = errorResponse;
        console.error('ErrorMsg creating post:', this.errResonseMsg);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/posts']);
  }
}
