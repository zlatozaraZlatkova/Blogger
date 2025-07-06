import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent {
   @Input() article!: IPost;

   constructor(private router: Router) {}

   onEdit(id: string) {
    console.log("clicked on button edit", id, "url:",`/posts/update/${id}` )
    this.router.navigate(['/posts/update', id]);
  }

}
