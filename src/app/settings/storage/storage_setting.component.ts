import {Component, OnInit} from '@angular/core';
import {SettingService} from "../../core/services/setting.service";
import {ElectronService} from "../../core/services";
import {Setting} from "../../core/model/setting.model";

// The navigation dashboard component
@Component({
  selector: 'app-storage-setting-component',
  templateUrl: './storage_setting.component.html',
  styleUrls: ['./storage_setting.component.scss']
})

export class StorageSettingComponent implements OnInit {

  maxTicket:number;
  settingTemp: Setting;

  constructor(private settingService: SettingService, private electronService: ElectronService) {
  }

  ngOnInit() {
    this.settingTemp = this.settingService.settingTemp;
    this.maxTicket= this.settingTemp.maxTicket;
  }

  changeEnd($event) {
    this.settingTemp.maxTicket = $event.target.value;
    console.log($event.target.value)
    this.settingService.settingTemp =  this.settingTemp;
  }
}
