import { Component, Input } from '@angular/core';
import { IPost } from 'src/app/interfaces/post';


@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})


export class BlogCardComponent {
  @Input() article!: IPost;

}
