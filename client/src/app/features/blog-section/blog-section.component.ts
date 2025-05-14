import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent {
  articles = [
    {
      id: 1,
      imageUrl: 'https://pagedone.io/asset/uploads/1696244553.png',
      imageAlt: 'Harsh image',
      imageAuthor: 'assets/images/blog/article-author-01.png',
      title: 'Fintech 101: Exploring the Basics of Electronic Payments',
      author: 'Harsh C.',
      timeAgo: '1 week ago'
    },
    {
      id: 2,
      imageUrl: 'https://pagedone.io/asset/uploads/1696244579.png',
      imageAlt: 'John image',
      imageAuthor: 'assets/images/blog/article-author-01.png',
      title: 'From Classroom to Cyberspace: The Growing Influence of EdTech in Fintech',
      author: 'John D.',
      timeAgo: '2 weeks ago'
    },
    {
      id: 3,
      imageUrl: 'https://pagedone.io/asset/uploads/1696244619.png',
      imageAlt: 'Alexa image',
      imageAuthor: 'assets/images/blog/article-author-01.png',
      title: 'Fintech Solutions for Student Loans: Easing the Burden of Education Debt',
      author: 'Alexa H.',
      timeAgo: '2 days ago'
    },
    {
      id: 4,
      imageUrl: 'https://pagedone.io/asset/uploads/1696244553.png',
      imageAlt: 'Harsh image',
      imageAuthor: 'assets/images/blog/article-author-01.png',
      title: 'Fintech 101: Exploring the Basics of Electronic Payments',
      author: 'Harsh C.',
      timeAgo: '1 week ago'
    },
    {
      id: 5,
      imageUrl: 'https://pagedone.io/asset/uploads/1696244579.png',
      imageAlt: 'John image',
       imageAuthor: 'assets/images/blog/article-author-01.png',
      title: 'From Classroom to Cyberspace: The Growing Influence of EdTech in Fintech',
      author: 'John D.',
      timeAgo: '2 weeks ago'
    },
    {
      id: 6,
      imageUrl: 'https://pagedone.io/asset/uploads/1696244619.png',
      imageAlt: 'Alexa image',
      imageAuthor: 'assets/images/blog/article-author-01.png',
      title: 'Fintech Solutions for Student Loans: Easing the Burden of Education Debt',
      author: 'Alexa H.',
      timeAgo: '2 days ago'
    }
  ];

  viewAllBlogs() {
    console.log('View all blogs clicked');
  }
}
