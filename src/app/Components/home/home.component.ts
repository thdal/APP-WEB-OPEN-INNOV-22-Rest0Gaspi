import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuLeftComponent} from "../menu/menu-left/menu-left.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css' ,'../../../assets/css/global-pages.css']
})
export class HomeComponent implements OnInit {
  public currentUser;
  sortParam:string;
  @ViewChild(MenuLeftComponent) child;
  mobile = false;

  constructor() {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    console.log("cherchegenreid")
    console.log(this.currentUser);
  }

  ngOnInit() {
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
  }

  receiveSortingParameter($event) {
    console.log("cotéhome");
    console.log($event)
    this.sortParam = $event
  }

}
