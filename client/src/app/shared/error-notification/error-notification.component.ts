import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.css']
})
export class ErrorNotificationComponent implements OnInit, OnDestroy {

  timer: number | null = null;
  errResponseMsg: string | null = null;

  subscription!: Subscription;

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.subscription = this.errorService.apiError$.subscribe((msg) => {
      this.errResponseMsg = msg;

      if(msg) {
        this.restartTimer();
      }
    })

  }



  private restartTimer(): void {

    if (!this.errResponseMsg) {
      return; 
    }

    this.timer = setTimeout(() => {

      this.errorService.clearError();

    }, 5000) as unknown as number;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }
  }


}


