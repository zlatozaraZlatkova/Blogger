import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eye-icon',
  templateUrl: './eye-icon.component.html',
  styleUrls: ['./eye-icon.component.css']
})
export class EyeIconComponent {
  @Input() closed = false;

}
