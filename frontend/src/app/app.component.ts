import {Component, OnInit} from '@angular/core';
import {ThemeService} from './services/theme.service';
import {Observable} from 'rxjs';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  theme: Observable<string>;
  loadingRouteConfig: boolean;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.themeService.setTheme(theme);
    }
    this.theme = this.themeService.theme;

    // Auto login
    this.authService.autoAuthUser();

    // Router loading
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
  }
}
