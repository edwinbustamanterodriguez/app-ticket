import {Injectable} from '@angular/core';
import {Setting} from '../../../shared/model/setting.model';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  public storageChange: ReplaySubject<Setting> = new ReplaySubject();
  private _settingTemp: Setting = null;

  constructor() {
  }


  public setSettings(setting: Setting): void {
    localStorage.setItem('setting', JSON.stringify(setting));
    this.storageChange.next(setting);
  }

  public getSettings(): Setting {
    const item = localStorage.getItem('setting');
    if (item !== null) {
      return JSON.parse(item);
    }
    return {
      speed: 100,
      maxTicketShow: 10,
      backgroundColor: '#343a40',
      backgroundColor2: '#495057',
      lineSeparatorColor: '#212529',
      activeListColor: '#007bff',
      activeTextColor: '#ffffff',
      sliderBarColor: '#ffe4d1',
      sliderSelectionColor: '#fd7e14',
      urlColor: '#17a2b8',
      paragraphColor: '#adb5bd',
      readColor: '#28a745',
      paragraphSize: 13
    };
  }


  get settingTemp(): Setting {
    return this._settingTemp;
  }

  set settingTemp(value: Setting) {
    this._settingTemp = value;
  }
}
