import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/interfaces/article';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})


export class BlogCardComponent {
  @Input() article!: IArticle;
}
