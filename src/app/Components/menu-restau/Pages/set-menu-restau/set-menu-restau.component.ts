import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-set-menu-restau',
  templateUrl: './set-menu-restau.component.html',
  styleUrls: ['./set-menu-restaucomponent.css','../../../../../assets/css/global-pages.css']
})
export class SetMenuRestauComponent implements OnInit {
  mobile = false;

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
  }

}
