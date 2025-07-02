import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, Subscription, switchMap, takeUntil, timer } from 'rxjs';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.css']
})
export class ErrorNotificationComponent implements OnInit, OnDestroy {
  errResponseMsg: string | null = null;
  private destroy$ = new Subject<void>();

  subscription!: Subscription;

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.subscription = this.errorService.apiError$
      .pipe(
        takeUntil(this.destroy$),
        filter((msg): msg is string => !!msg),
        switchMap((msg) => {
          this.errResponseMsg = msg;
          return timer(5000);
        })
      )
      .subscribe(() => {
        this.errorService.clearError();
        this.errResponseMsg = null;
      });
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }


}


