import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ElectronService} from "../core/services";
import {SettingService} from "../core/services/setting.service";
import {Setting} from "../core/model/setting.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router, private electronService: ElectronService, private settingService: SettingService) {
  }

  ngOnInit() {
    let settings: Setting = this.settingService.getSettings();
    this.settingService.settingTemp = settings;
    console.log(this.settingService.settingTemp);
    // Load speed by default.
    this.router.navigate(['/settings/speed']);
  }

  save(): void {
    this.settingService.setSettings(this.settingService.settingTemp);
    this.electronService.ipcRenderer.send('close-settings-win',this.settingService.getSettings());
  }

  close(): void {
    this.electronService.ipcRenderer.send('close-settings-win', null);
  }
}
