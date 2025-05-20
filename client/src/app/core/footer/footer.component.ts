import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  submitNewsletter(event: Event) {
    event.preventDefault();

    console.log('Newsletter form submitted');
  }
}
