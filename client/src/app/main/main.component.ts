import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { IRouteData } from '../interfaces/RouteData';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  currentLayout = 'default';
  showHeader = true;
  showFooter = true;

  constructor(
    private router: Router,
    private pageTitle: Title,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getCurrentRouteData())
      )
      .subscribe((data) => {
        this.addRouteSettings(data);
      });
  }

  private getCurrentRouteData(): IRouteData {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.snapshot.data || {};
  }

  private addRouteSettings(data: IRouteData): void {
    if (data['title']) {
      this.pageTitle.setTitle(data['title']);
    }
    this.currentLayout = data['layout'] || 'default';
    this.showHeader = data['showHeader'] !== false;
    this.showFooter = data['showFooter'] !== false;
  }
}
