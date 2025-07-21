import { Injectable, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MatIconService implements OnInit {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadMatIcons()
  }

  loadMatIcons(): void {
    const icons = [
      { name: 'twitter', url: '../../assets/icons/twitter.svg' },
      { name: 'linkedin', url: '../../assets/icons/linkedin.svg' },
      { name: 'github', url: '../../assets/icons/github.svg' },
      { name: 'logo', url: '../../assets/icons/logo.svg' },
      { name: 'write', url: '../../assets/icons/write.svg' },
      { name: 'person', url: '../../assets/icons/person.svg' },
      { name: 'bar-chart-outline', url: '../../assets/icons/bar-chart-outline.svg' },
      { name: 'connect', url: '../../assets/icons/connect.svg' },
      { name: 'delete', url: '../../assets/icons/delete.svg' },
      
      
    ];

    icons.forEach((icon) => {
      this.iconRegistry.addSvgIcon(
        icon.name,
        this.sanitizer.bypassSecurityTrustResourceUrl(icon.url)
      );
    });
  }
}
