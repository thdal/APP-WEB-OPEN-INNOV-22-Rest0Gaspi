import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../_services/authentication.service";
import {User} from "../../../../_models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-restau-not-found',
  templateUrl: './menu-restau-not-found.component.html',
  styleUrls: ['./menu-restau-not-found.component.css']
})
export class MenuRestauNotFoundComponent implements OnInit {
  currentUser: User;
  @Input() eventNotFound: string;
  eventNotFoundStr = "";

  constructor(private router: Router,private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  goToaddEvent(){
    if(this.currentUser.profile_id == 2){
      alert("Vous devez être organisateur pour ajouter un événement.")
    }else{
      this.router.navigate(['/addAnEvent']);
    }
  }

  goToHome(){
    let url = (window.location.hash).split('/')[1];
    if(!url){
      window.location.reload();
    }
    this.router.navigate(['']);
  }
}
