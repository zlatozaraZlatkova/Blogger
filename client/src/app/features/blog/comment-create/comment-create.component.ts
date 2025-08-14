import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IComment } from 'src/app/interfaces/comment';
import { AuthService } from 'src/app/user/auth.service';
import { BlogService } from '../blog.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css'],
})
export class CommentCreateComponent {
  @Input() postId: string = '';

  get user() {
    return this.authService.user;
  }

  commentForm = this.fb.group({
    text: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(250)],
    ],
  });

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private fb: FormBuilder
  ) {}

  onSubmitComment(): void {
    if (this.commentForm.invalid || !this.user) {
      return;
    }

    //console.log('PostId:', this.postId);
    //console.log('User ID:', this.user._id);

    const newCommentText = this.commentForm.get('text')?.value;
    if (!newCommentText) {
      return;
    }

    const newComment: IComment = {
      text: newCommentText,
      name: this.user.name,
      avatar: this.user.avatar,
      user: this.user._id,
    };

    this.blogService
      .createComment(this.postId, newComment)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.commentForm.reset();
          //console.log('Comment created successfully');
        },
      });
  }
}
