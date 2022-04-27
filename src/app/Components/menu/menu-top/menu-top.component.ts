import { Component, OnInit } from '@angular/core';
import {User} from "../../../_models/user";
import {AuthenticationService} from "../../../_services/authentication.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {
  currentUser: User;
  apiUrl = environment.apiBaseUrl;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser);
  }

  ngOnInit(): void {
    //Ici on gère manuellement le clique sur un bouton du menu top pour l'affichage du background-color
    //Récupére le pathname de la route actuelle sans paramètre ex: eventsList/1 -> eventsList
    let url = (window.location.hash).split('/')[1];
    //Cherche tous les id du template qui match avec le pathname
    $('li a').each(function() {
      if ($(this).attr('id') === url) {
        //Ajoute la classe active-gl à id===pathname (donc on fait matcher nos id dans le template)
        //On a une classe spécifique pour les mobiles
        if(!(window.screen.width <= 480)){
          $(this).closest('li').addClass('active-gl');
        }else{
          $(this).closest('li').addClass('active-mobile-gl');
        }
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  signUp() {
    this.authenticationService.logout();
    this.router.navigate(['/register']);
  }
  //Call la route de la page de l'ajout d'un événement formEvent
  addAnEvent() {
    this.router.navigate(['/addAnEvent']);
  }
  //Call la route de la page de la liste des évenements pour un utilisateur
  goToMyEvents() {
    this.router.navigate(['/eventsList', this.currentUser.id]);
  }
  //Call la route de l'édition du profil utilisateur
  editUserProfile(){
    this.router.navigate(['/editProfile', this.currentUser.id]);
  }
  //Call la route de la page sur la politique de confidentialité RGPD
  goToPrivacyPolicy(){
    //this.router.navigate(['/editProfile', this.currentUser.id]);
  }
  //Call la route de la gestion des utilisateurs (route admin)
  manageUsers(){
    this.router.navigate(['/manageUsers']);
  }
  //Call la route home ou recharche si on s'y trouve
  goToHome(){
    let url = (window.location.hash).split('/')[1];
    if(!url){
      window.location.reload();
    }
    this.router.navigate(['']);
  }

  //Image dynamique en fonction du genre et du profile
  //Genres: 1 = femme, 2 = Homme
  //Profiles: 1=Organisateur, 2=Participant, 3=Administrateur
  getTopImage() {
    if (this.currentUser.genre_id == 2) {
      if(this.currentUser.profile_id != 3){
        return 'assets/img/icons/user/Profiles/man.svg';
      }else{
        return 'assets/img/icons/user/Profiles/man3.svg';
      }
    } else {
      if(this.currentUser.profile_id != 3){
        return 'assets/img/icons/user/Profiles/woman.svg';
      }else{
        return 'assets/img/icons/user/Profiles/woman3.svg';
      }
    }
  }


}
