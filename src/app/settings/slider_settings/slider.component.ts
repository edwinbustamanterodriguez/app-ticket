import {Component, OnInit} from '@angular/core';
import {SettingService} from "../../core/services/settings/setting.service";
import {ElectronService} from "../../core/services";
import {Setting} from "../../shared/model/setting.model";
import {LabelType, Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-slider-component',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})

export class SliderComponent implements OnInit {

  settingTemp: Setting;
  value: number = 0;
  maxTicketShow: number;
  options: Options = {
    ceil: 100,
    tickStep: 10,
    tickValueStep: 10,
    floor: 0,
    showSelectionBar: true,
    showTicks: true,
    getTickColor: (value: number): string => {
      if (value <= 20) {
        return 'red';
      }
      if (value <= 40) {
        return 'orange';
      }
      if (value <= 60) {
        return 'yellow';
      }
      return '#2AE02A';
    },
    getPointerColor: (value: number): string => {
      if (value <= 20) {
        return 'red';
      }
      if (value <= 40) {
        return 'orange';
      }
      if (value <= 60) {
        return 'yellow';
      }
      return '#2AE02A';
    },
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          if (value < 10) {
            return 'Fast';
          }

          if (value > 90) {
            return 'Slow';
          }
          return value + '<b>%</b>';
        default:
          if (value < 10) {
            return 'Fast';
          }

          if (value > 90) {
            return 'Slow';
          }
          return value + '<b>%</b>';
      }
    }
  };

  constructor(private settingService: SettingService, private electronService: ElectronService) {
  }

  ngOnInit() {
    this.settingTemp = this.settingService.settingTemp;
    this.value = this.settingTemp.speed;
    this.maxTicketShow = this.settingTemp.maxTicketShow;
  }

  changeEnd($event) {
    this.settingTemp.speed = this.value;
    this.settingService.settingTemp = this.settingTemp;
  }
  changeEndMaxTicket($event) {
    this.settingTemp.maxTicketShow = $event.target.value <= 0 ? 1 : $event.target.value;
    this.settingService.settingTemp = this.settingTemp;
  }
}
