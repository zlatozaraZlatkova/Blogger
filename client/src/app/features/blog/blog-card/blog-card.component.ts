import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/interfaces/post';
import { BlogService } from '../blog.service';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent {
  @Input() article!: IPost;

  constructor(private router: Router, private blogService: BlogService) {}

  onEdit(id: string) {
    this.router.navigate(['/posts/update', id]);
  }

  onDelete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    this.blogService.deletePost(id).subscribe({
      next: (response) => {
        console.log('Delete successful:', response);
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        console.error('Delete failed:', error);
      },

    });
  }
}
