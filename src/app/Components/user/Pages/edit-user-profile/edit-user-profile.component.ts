import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css', '../../../../../assets/css/global-pages.css']
})
export class EditUserProfileComponent implements OnInit {
  mobile = false;

  constructor() {}

  ngOnInit(): void {
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
  }

}
