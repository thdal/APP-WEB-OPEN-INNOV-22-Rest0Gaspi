import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MenuRestauService} from "../../../../_services/menu-restau.service";
import {Menu} from "../../../../_models/menu";
import {environment} from "../../../../../environments/environment";
import { ShareButtonsConfig } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
@Component({
  selector: 'app-menu-restau-view',
  templateUrl: './menu-restau-view.component.html',
  styleUrls: ['./menu-restau-view.component.css']
})
export class MenuRestauViewComponent implements OnInit {
  menuOpen : Menu;
  eventId : any;
  eventImg: boolean;
  typeName = "";
  canalName = "";
  eventHour = "";
  apiUrl = environment.apiBaseUrl;
  mobile = false;
  shareUrl = "https://www.google.com/";

  constructor(private router: Router, private eventService: MenuRestauService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    if(environment.production)
      this.shareUrl = environment.appBaseUrl + '#' + this.router.url;
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
    //J'init l'object en attendant le subscribe qui suit
    this.menuOpen = new Menu();
    this.getEventbyId();
  }

  //Récupére un événement particulier (pour la modification)
  getEventbyId(){
    //On récupére l'id depuis la route avec un observable
    this.activatedRoute.paramMap.subscribe(params => {
      this.eventId = params.get('eventId');
      //On envoie l'id au service et on met à jour le formulaire
      this.eventService.getEventById(this.eventId).subscribe(data => {
        if(data.eventHour == null){
          this.eventHour = "--:--";
        }else{
          this.eventHour = data.eventHour.toString();
        }
        this.menuOpen = data;
        this.eventImg = data.eventImg;
        this.getEventTypes();
        this.getMenuCanals();
      });
    });
  }

//Récupére les catégories/types de menus (Vegan ect..)
  getEventTypes(){
    this.eventService.getMenuTypes().subscribe(data => {
      data.forEach((item) => {
        if(item.id == this.menuOpen.typeMenuId){
          this.typeName = item.typeEventName;
        }
      });
    });
  }
  //Récupére les canaux des menus
  getMenuCanals(){
    this.eventService.getMenuCanals().subscribe(data => {
      data.forEach((item) => {
        if(item.id == this.menuOpen.canalMenuId){
          this.canalName = item.canalEventName;
        }
      });
    });
  }

}
