import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuLeftComponent} from "../../../menu/menu-left/menu-left.component";

@Component({
  selector: 'app-my-menu-restau',
  templateUrl: './my-menu-restau.component.html',
  styleUrls: ['./my-menu-restau.component.css','../../../../../assets/css/global-pages.css']
})
export class MyMenuRestauComponent implements OnInit {
  public currentUser;
  sortParam:string;
  @ViewChild(MenuLeftComponent) child;
  mobile = false;

  constructor() {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
  }

  ngOnInit() {
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
  }

  receiveSortingParameter($event) {
    $event["userId"] = this.currentUser.id;
    this.sortParam = $event
  }

}
