import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {ThemeService} from '../../services/theme.service';

import {themes} from '../../global/global.variables';
import {AuthService} from '../../auth/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  userIsAuthenticated = false;
  searchForm: FormGroup;
  theme: Observable<string>;
  themes = themes;
  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private fb: FormBuilder
  ) { }
  changeTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

  logout() {
    this.authService.logout();
  }
  onSubmit() {
    console.log(this.searchForm.value['search']);
  }
  ngOnInit() {
    this.theme = this.themeService.theme;
    this.searchForm = this.fb.group({
      search: ['', [
        Validators.required
      ]]
    });


    this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authStateListenerSubs = this.authService.getAuthStatusListener().subscribe(
    //   isAuthenticated => {
    //     this.userIsAuthenticated = isAuthenticated;
    //   }
    // );
    // this.authLevelListenerSubs = this.authService.getAuthLevelListener().subscribe(
    //   level => {
    //     this.userLevel = level;
    //   }
    // );
  }

}
