import {Injectable} from '@angular/core';
import {SettingService} from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentChangeColorService {
  private themeWrapper = document.querySelector('body');

  constructor(private settingService: SettingService,) {
  }

  applyTempColor(): void {
    let settingTemp = this.settingService.settingTemp;
    this.themeWrapper.style.setProperty('--backgroundColor', settingTemp.backgroundColor);
    this.themeWrapper.style.setProperty('--backgroundColor2', settingTemp.backgroundColor2);
    this.themeWrapper.style.setProperty('--lineSeparatorColor', settingTemp.lineSeparatorColor);
    this.themeWrapper.style.setProperty('--activeListColor', settingTemp.activeListColor);
    this.themeWrapper.style.setProperty('--activeTextColor', settingTemp.activeTextColor);
    this.themeWrapper.style.setProperty('--sliderBarColor', settingTemp.sliderBarColor);
    this.themeWrapper.style.setProperty('--sliderSelectionColor', settingTemp.sliderSelectionColor);
    this.themeWrapper.style.setProperty('--urlColor', settingTemp.urlColor);
    this.themeWrapper.style.setProperty('--readColor', settingTemp.readColor);
    this.themeWrapper.style.setProperty('--paragraphSize', settingTemp.paragraphSize + 'px');
  }
  applyPersistColor(): void {
    let settings = this.settingService.getSettings();
    this.themeWrapper.style.setProperty('--backgroundColor', settings.backgroundColor);
    this.themeWrapper.style.setProperty('--backgroundColor2', settings.backgroundColor2);
    this.themeWrapper.style.setProperty('--lineSeparatorColor', settings.lineSeparatorColor);
    this.themeWrapper.style.setProperty('--activeListColor', settings.activeListColor);
    this.themeWrapper.style.setProperty('--activeTextColor', settings.activeTextColor);
    this.themeWrapper.style.setProperty('--sliderBarColor', settings.sliderBarColor);
    this.themeWrapper.style.setProperty('--sliderSelectionColor', settings.sliderSelectionColor);
    this.themeWrapper.style.setProperty('--urlColor', settings.urlColor);
    this.themeWrapper.style.setProperty('--readColor', settings.readColor);
    this.themeWrapper.style.setProperty('--paragraphSize', settings.paragraphSize + 'px');
  }
}
