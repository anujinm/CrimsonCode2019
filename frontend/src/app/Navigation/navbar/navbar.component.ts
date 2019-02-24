import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {ThemeService} from '../../services/theme.service';

import {themes} from '../../global/global.variables';
import {AuthService} from '../../auth/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  userIsAuthenticated = false;
  searchForm: FormGroup;
  themes = themes;
  language = 'en';
  theme: Observable<string>;
  authStateListenerSubs: Subscription;
  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  changeTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

  logout() {
    this.authService.logout();
  }
  onSubmit() {
    console.log(this.language);
    this.router.navigate(['search'],{ queryParams: {q: this.searchForm.value['search'], target: this.language}});
  }

  changeLanguage(language) {
    this.themeService.setLanguage(language);
  }

  ngOnInit() {
    this.themeService.language.subscribe(r => this.language = r);
    this.theme = this.themeService.theme;
    this.searchForm = this.fb.group({
      search: ['', [
        Validators.required
      ]]
    });


    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStateListenerSubs = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      }
    );

  }

}
