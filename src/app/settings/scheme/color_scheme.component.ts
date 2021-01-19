import {Component, OnInit} from '@angular/core';
import {SettingService} from "../../core/services/setting.service";
import {ElectronService} from "../../core/services";
import {Setting} from "../../shared/model/setting.model";

// The navigation dashboard component
@Component({
  selector: 'app-color-scheme-component',
  templateUrl: './color_scheme.component.html',
  styleUrls: ['./color_scheme.component.scss']
})

export class ColorSchemeComponent implements OnInit {

  maxTicket:number;
  settingTemp: Setting;

  constructor(private settingService: SettingService,) {
  }

  ngOnInit() {
    this.settingTemp = this.settingService.settingTemp;
    this.maxTicket= this.settingTemp.maxTicketShow;
  }

  changeEnd($event) {
    this.settingTemp.maxTicketShow = $event.target.value;
    console.log($event.target.value)
    this.settingService.settingTemp =  this.settingTemp;
  }
}
