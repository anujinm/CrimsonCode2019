import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {themes} from '../global/global.variables';
import {OverlayContainer} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _theme: BehaviorSubject<string> = new BehaviorSubject<string>('indigo-light-theme');
  private _language: BehaviorSubject<string> = new BehaviorSubject<string>('en');
  theme = this._theme.asObservable();
  language = this._language.asObservable();
  themes = themes;

  setTheme(theme: string) {
    this._theme.next(theme);
    this.setOverlay(theme);
    localStorage.setItem('theme', theme);
  }

  setLanguage(language: string) {
    this._language.next(language);
    localStorage.setItem('language', language);
  }

  setOverlay(theme: string) {
    for (let i = 0; i < this.themes.length; i++) {
      if (this.overlayContainer.getContainerElement().classList.contains(this.themes[i].name)) {
        this.overlayContainer.getContainerElement().classList.remove(this.themes[i].name);
      }
    }
    this.overlayContainer.getContainerElement().classList.add(theme);
  }

  constructor(private overlayContainer: OverlayContainer) { }
}
