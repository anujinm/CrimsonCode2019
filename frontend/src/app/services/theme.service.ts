import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {themes} from '../global/global.variables';
import {OverlayContainer} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _theme: BehaviorSubject<string> = new BehaviorSubject<string>('indigo-light-theme');
  theme = this._theme.asObservable();
  themes = themes;

  setTheme(theme: string) {
    this._theme.next(theme);
    this.setOverlay(theme);
    localStorage.setItem('theme', theme);
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
