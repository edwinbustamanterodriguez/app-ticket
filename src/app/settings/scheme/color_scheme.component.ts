import {Component, OnInit} from '@angular/core';
import {SettingService} from '../../core/services/setting.service';
import {Setting} from '../../shared/model/setting.model';
import {DocumentChangeColorService} from '../../core/services/document_change_color.service';

@Component({
  selector: 'app-color-scheme-component',
  templateUrl: './color_scheme.component.html',
  styleUrls: ['./color_scheme.component.scss']
})

export class ColorSchemeComponent implements OnInit {
  settingTemp: Setting;
  backgroundColor: string;
  backgroundColor2: string;
  lineSeparatorColor: string;
  activeListColor: string;
  activeTextColor: string;
  sliderBarColor: string;
  sliderSelectionColor: string;
  urlColor: string;
  paragraphColor: string;
  readColor: string;
  paragraphSize: number;

  // private themeWrapper = document.querySelector('body');

  constructor(private settingService: SettingService, private  documentChangeColorService: DocumentChangeColorService) {
  }

  ngOnInit(): void {
    this.settingTemp = this.settingService.settingTemp;
    this.backgroundColor = this.settingTemp.backgroundColor;
    this.backgroundColor2 = this.settingTemp.backgroundColor2;
    this.lineSeparatorColor = this.settingTemp.lineSeparatorColor;
    this.activeListColor = this.settingTemp.activeListColor;
    this.activeTextColor = this.settingTemp.activeTextColor;
    this.sliderBarColor = this.settingTemp.sliderBarColor;
    this.sliderSelectionColor = this.settingTemp.sliderSelectionColor;
    this.urlColor = this.settingTemp.urlColor;
    this.paragraphColor = this.settingTemp.paragraphColor;
    this.readColor = this.settingTemp.readColor;
    this.paragraphSize = this.settingTemp.paragraphSize;
  }

  changeBackgroundColor($event): void {
    if ($event.target.value) {
      this.settingTemp.backgroundColor = $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  changeBackgroundColor2($event): void {
    if ($event.target.value) {
      this.settingTemp.backgroundColor2 = $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  changeLineSeparatorColor($event): void {
    if ($event.target.value) {
      this.settingTemp.lineSeparatorColor = $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  changeActiveListColor($event): void {
    if ($event.target.value) {
      this.settingTemp.activeListColor = $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  changeActiveTextColor($event): void {
    if ($event.target.value) {
      this.settingTemp.activeTextColor = $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  changeSliderBarColor($event): void {
    if ($event.target.value) {
      this.settingTemp.sliderBarColor = $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  changeSliderSelectionColor($event): void {
    if ($event.target.value) {
      this.settingTemp.sliderSelectionColor = $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  changeUrlColor($event): void {
    if ($event.target.value) {
      this.settingTemp.urlColor = $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  changeParagraphColor($event): void {
    if ($event.target.value) {
      this.settingTemp.paragraphColor = $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  changeReadColor($event): void {
    if ($event.target.value) {
      this.settingTemp.readColor = $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  changeParagraphSize($event): void {
    if ($event.target.value) {
      this.settingTemp.paragraphSize = $event.target.value > 23 ? 23: $event.target.value < 9 ? 9 : $event.target.value;
      this.settingService.settingTemp = this.settingTemp;
      this.documentChangeColorService.applyTempColor();
    }
  }

  /*onSubmit(form) {
    this.global(form.value);
  }

  global(stylesheet) {
    console.log(stylesheet);
    // Navigation Styles
    if (stylesheet.backgroundColor) {
      this.themeWrapper.style.setProperty('--backgroundColor', stylesheet.backgroundColor);
    }
  }*/

}
