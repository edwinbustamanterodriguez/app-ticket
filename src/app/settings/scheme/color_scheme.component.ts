import {Component, OnInit} from '@angular/core';
import {SettingService} from '../../core/services/setting.service';
import {ElectronService} from '../../core/services';
import {Setting} from '../../shared/model/setting.model';

// The navigation dashboard component
@Component({
  selector: 'app-color-scheme-component',
  templateUrl: './color_scheme.component.html',
  styleUrls: ['./color_scheme.component.scss']
})

export class ColorSchemeComponent {

  private themeWrapper = document.querySelector('body');

  onSubmit(form) {
    this.global(form.value);
  }

  global(stylesheet) {
    console.log(stylesheet);
    // Navigation Styles
    if (stylesheet.backgroundColor) {
      this.themeWrapper.style.setProperty('--backgroundColor', stylesheet.backgroundColor);
    }
  }
}
