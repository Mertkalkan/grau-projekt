import { Component } from '@angular/core';
import { ThemeOption } from 'ngx-echarts';

export const CoolTheme = {
  color: [
    '#b21ab4',
    '#6f0099',
    '#2a2073',
    '#0b5ea8',
    '#17aecc',
    '#b3b3ff',
    '#eb99ff',
    '#fae6ff',
    '#e6f2ff',
    '#eeeeee'
  ],
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isChecked = false;
  theme: string | ThemeOption;
  coolTheme = CoolTheme;

  constructor() {
    this.theme = ''
  }

  changed(){
    this.isChecked == true ? this.theme = "dark" : this.theme = "default"
  }
}




