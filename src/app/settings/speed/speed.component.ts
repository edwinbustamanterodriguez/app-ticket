import {Component, OnInit} from '@angular/core';
import {SettingService} from "../../core/services/setting.service";
import {ElectronService} from "../../core/services";
import {Setting} from "../../core/model/setting.model";
import {LabelType, Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-speed-component',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.scss']
})

export class SpeedComponent implements OnInit {

  settingTemp: Setting;
  value: number = 0;
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
  }

  changeEnd($event) {
    this.settingTemp.speed = this.value;
    this.settingService.settingTemp = this.settingTemp;
  }
}
