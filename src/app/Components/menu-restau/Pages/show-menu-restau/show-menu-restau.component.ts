import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-menu-restau',
  templateUrl: './show-menu-restau.component.html',
  styleUrls: ['./show-menu-restau.component.css','../../../../../assets/css/global-pages.css']
})
export class ShowMenuRestauComponent implements OnInit {
  mobile = false;


  constructor() { }

  ngOnInit(): void {
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
  }

}
