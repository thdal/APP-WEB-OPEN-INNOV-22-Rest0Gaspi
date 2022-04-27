import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.css', '../../../../../assets/css/global-pages.css']
})
export class UserAdministrationComponent implements OnInit {
  mobile = false;
  constructor() { }

  ngOnInit(): void {
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
  }

}
