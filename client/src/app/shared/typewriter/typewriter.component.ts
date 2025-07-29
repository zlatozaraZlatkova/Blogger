import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { interval, Subject, take, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css'],
})
export class TypewriterComponent implements OnInit, OnDestroy {
  displayedText = signal('');
  private destroy$ = new Subject<void>();

  private text: string = 'git push --force';


  ngOnInit(): void {
    this.startAnimation();
  }

  private startAnimation(): void {
    this.displayedText.set('');

    const typingText = interval(100).pipe(
        take(this.text.length),
        takeUntil(this.destroy$)

      ).subscribe({
        next: (index) => {
          const newText = this.text.substring(0, index + 1);
          this.displayedText.set(newText);
        },
        complete: () => {
          const restartTimer = timer(2000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.startAnimation());
        },

      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
