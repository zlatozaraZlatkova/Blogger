import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css']
})
export class TypewriterComponent implements OnInit {

  displayedCode = signal('');

  text: string = 'git push --force';

  ngOnInit(): void {
    this.startAnimation();
  }

  private startAnimation() {
    let currentIndex = 0;

    setInterval(() => {
      if (currentIndex >= this.text.length) return;

      const newCode = this.text.substring(0, currentIndex + 1);
      this.displayedCode.set(newCode);
      currentIndex++;

    }, 100);
  }






}
