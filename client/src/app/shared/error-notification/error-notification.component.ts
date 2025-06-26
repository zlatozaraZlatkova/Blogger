import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.css']
})
export class ErrorNotificationComponent implements OnChanges, OnDestroy {
  @Input() errResponseMsg = '';

  timer: number | null = null;

  ngOnChanges(): void {
    this.restartTimer();
  }

  private restartTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer)
    };

    this.timer = setTimeout(() => {
      this.errResponseMsg = '';
    }, 5000) as unknown as number;
  }
  
  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }


}


