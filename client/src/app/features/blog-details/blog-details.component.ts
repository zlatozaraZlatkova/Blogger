import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  relatedArticles: IPost[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
   

  }
  

}
