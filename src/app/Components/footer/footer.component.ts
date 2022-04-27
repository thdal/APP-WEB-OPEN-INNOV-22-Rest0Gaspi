import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //Call la route de la page des privacy policy
  goToPrivacyPolicy() {
    this.router.navigate(['/privacyPolicy']);
  }

  //Call la route de la page des mentions légales
  goToLegalNotices() {
    this.router.navigate(['/legalNotices']);
  }
  //Call la route de la page des cgu
  goToCgu() {
    this.router.navigate(['/cgu']);
  }

}
