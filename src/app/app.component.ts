import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'APP-WEB-Rest0Gaspi';
  constructor(translate: TranslateService) {
    // Define French as uniq lang
    translate.addLangs(['fr']);
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
}
