import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  showBack: boolean = true;
  isLoggedIn: boolean = false;

  constructor(private tokenStorage: TokenStorageService, private navigation: NavigationService) {
    this.isLoggedIn = this.tokenStorage.isLoggedIn();
    this.tokenStorage.getTokenState().subscribe(state =>{
      this.isLoggedIn = state;

    });
    this.navigation.showBackBtn().subscribe(state => this.showBack = state);
  }

  ngOnInit(): void {
  }

  back(): void {
    this.navigation.back();
  }

  logout(): void {
    this.tokenStorage.signOut();
  }

}
