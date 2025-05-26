import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})

export class BlogCreateComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

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
  }

  onCancel(): void {
    this.router.navigate(['/posts']);
  }
}
