import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css','../../../../../assets/css/global-pages.css']
})
export class PrivacyPolicyComponent implements OnInit {
  mobile = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
  }

  //Call la route de la page des mentions légales
  goToLegalNotices() {
    this.router.navigate(['/legalNotices']);
  }
  //Call la route de la page des cgu
  goToCgu() {
    this.router.navigate(['/cgu']);
  }
  //Call la route de la page des privacy policy
  goToPrivacyPolicy() {
    this.router.navigate(['/privacyPolicy']);
  }

}
