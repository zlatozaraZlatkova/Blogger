import { Component, Input } from '@angular/core';
import { IComment } from 'src/app/interfaces/comment';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent {
  @Input() comments: IComment[] = [];
  @Input() postId: string = '';

  get user() {
    return this.authService.user;
  }


  constructor(private authService: AuthService) {}

 
 
}
