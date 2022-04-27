import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-menu-restau',
  templateUrl: './add-menu-restau.component.html',
  styleUrls: ['./add-menu-restau.component.css', '../../../../../assets/css/global-pages.css']
})
export class AddMenuRestauComponent implements OnInit {
  mobile = false;

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
  }

}
