import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';

import { BlogService } from '../blog.service';
import { ICreatePostDto, IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  loading = false;
  editPostForm!: FormGroup;
  postId: string | null = null;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.extractPostIdFromRoute();
    this.initializeForm();
    this.loadCurrentArticle();
  }


  private setLoadingState(isLoading: boolean): void {
    this.loading = isLoading;
  }
  
  private initializeForm(): void {
    this.editPostForm = this.fb.group({
      postTitle: ['', [Validators.required, Validators.maxLength(150)]],
      postImageUrl: ['', [Validators.required]],
      postCategory: ['', [Validators.required]],
      postText: ['', [Validators.required, Validators.maxLength(3000)]],
      postTags: ['', [Validators.required]],
    });
  }


  private extractPostIdFromRoute(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error('No post ID found in route parameters');
      this.router.navigate(['/posts']);
      return;
    }
    this.postId = id;
  }

  private populateFormWithPostData(postData: IPost): void {
    this.editPostForm.patchValue({
      postTitle: postData.postTitle,
      postImageUrl: postData.postImageUrl,
      postCategory: postData.postCategory,
      postText: postData.postText,
      postTags: postData.postTags,
    });
  }


  private loadCurrentArticle(): void {
    if (!this.postId) { return };

    this.setLoadingState(true);

    this.blogService.getPostById(this.postId)
      .pipe(
        take(1),
        finalize(() => this.setLoadingState(false)))
      .subscribe({
        next: (postData) => {
          console.log('Post loaded successfully:', postData);
          this.populateFormWithPostData(postData);

        }
      });
  }


  private createPostDataFromForm(): ICreatePostDto {
    const formValue = this.editPostForm.value;

    return {
      postTitle: formValue.postTitle,
      postImageUrl: formValue.postImageUrl,
      postCategory: formValue.postCategory,
      postText: formValue.postText,
      postTags: formValue.postTags,
    };
  }


  handleEditFormSubmit(): void {
    if (this.editPostForm.invalid) {
      return;
    }
    console.log('Submitting edit form with data:', this.editPostForm.value);

    const postData = this.createPostDataFromForm();

    this.blogService.editPost(this.postId!, postData)
      .pipe(take(1))
      .subscribe({
        next: (updatedPost) => {
          console.log('Post updated successfully:', updatedPost);
          this.router.navigate([`/posts/${updatedPost._id}`]);
        },
        error: (error) => {
          console.error('Error updating post:', error);
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/posts']);
  }
}