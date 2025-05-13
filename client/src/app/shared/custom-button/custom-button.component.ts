import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent {
  @Input() buttonText: string = '';
  @Input() buttonClass: string = '';
  @Input() routerLink?: string | null = null;

}
