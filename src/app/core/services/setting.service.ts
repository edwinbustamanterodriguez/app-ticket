import { Injectable } from '@angular/core';
import {Setting} from "../model/setting.model";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  public storageChange: ReplaySubject<Setting> = new ReplaySubject();
  private _settingTemp: Setting = null;
  constructor(  ) {
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
      maxTicket:20,
    };
  }


  get settingTemp(): Setting {
    return this._settingTemp;
  }

  set settingTemp(value: Setting) {
    this._settingTemp = value;
  }
}
