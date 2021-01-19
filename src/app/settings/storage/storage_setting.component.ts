import {Component, OnInit} from '@angular/core';
import {SettingService} from '../../core/services/setting.service';
import {ElectronService} from '../../core/services';
import {Setting} from '../../shared/model/setting.model';

@Component({
  selector: 'app-storage-setting-component',
  templateUrl: './storage_setting.component.html',
  styleUrls: ['./storage_setting.component.scss']
})

export class StorageSettingComponent implements OnInit {

  maxTicketShow: number;
  settingTemp: Setting;

  constructor(private settingService: SettingService, private electronService: ElectronService) {
  }

  ngOnInit() {
    this.settingTemp = this.settingService.settingTemp;
    this.maxTicketShow = this.settingTemp.maxTicketShow;
  }

  changeEnd($event) {
    this.settingTemp.maxTicketShow = $event.target.value <= 0 ? 1 : $event.target.value;
    console.log($event.target.value)
    this.settingService.settingTemp = this.settingTemp;
  }
}
