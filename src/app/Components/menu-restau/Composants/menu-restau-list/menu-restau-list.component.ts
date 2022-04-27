import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MenuRestauService} from "../../../../_services/menu-restau.service";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {MenuRestauPaginationComponent} from "../menu-restau-pagination/menu-restau-pagination.component";
import {environment} from "../../../../../environments/environment";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-menu-restau-list',
  templateUrl: './menu-restau-list.component.html',
  styleUrls: ['./menu-restau-list.component.css'],
})
export class MenuRestauListComponent implements OnInit {
  pageOfItems: Array<any>;
  pageSize = 12;
  recEvents = [];
  errorNotFound = false;
  public currentUser;
  userId: number;
  profileId: number;
  eventNotFound: string;
  @Input() sortParam: string;
  @Input() myEvents: boolean;
  routeUserId: any;
  sortedBy: string;
  apiUrl = environment.apiBaseUrl;
  dateFilterActive = false;
  @ViewChild('dateDebut') dateDebut: ElementRef; //Pour récupérer la val du input plus facilement (déclaré dans le template)
  @ViewChild('dateFin') dateFin: ElementRef; //Pour récupérer la val du input plus facilement (déclaré dans le template)
  mobile = false;

  @ViewChild(MenuRestauPaginationComponent) jwPagination: MenuRestauPaginationComponent;

  constructor(private router: Router, private eventService: MenuRestauService, private activatedRoute: ActivatedRoute) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.userId = this.currentUser.id;
    this.profileId = this.currentUser.profile_id;
    this.eventNotFound = "";

  }

  ngOnInit(): void {
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
    this.getUserIdFromRoute();
    if (this.myEvents) {
      this.getEventsByUser(this.userId);
    } else {
      //this.getAllEvents();
      this.getEventsOfTheDay();
    }
  }

  //Fonction de pagination
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  //Fonction appelé qd un paramètre du composant change, ici sortParam à retrouver dans le parent
  ngOnChanges(changes: SimpleChanges) {
    let sortRecord = changes.sortParam.currentValue;
    if (sortRecord != undefined || sortRecord != null) {
      //On vient du composant Mes evenements alors on tri par utilisateur
      //Si on a un userId on vient de la page "mes évenements", on récupére seulement les événements de l'utilisateur connecté.
      this.sortedBy = sortRecord.name;//Variable d'affichage (label cat/canaux)
      if (sortRecord.userId) {
        let userId = sortRecord.userId;
        if (sortRecord.getAll) {
          this.getEventsByUser(sortRecord.userId);
        } else if (sortRecord.searchInput) {
          if (sortRecord.val) {
            this.searchInputWithUserId(sortRecord.val, sortRecord.userId);
          } else {
            this.getEventsByUser(sortRecord.userId);
          }
        } else if (sortRecord.getEventsOfTheDay) {
          this.getEventsOfTheDayByUser(sortRecord.userId);
        } else if (sortRecord.sortByType) {
          let typeId = sortRecord.id;
          this.getEventsByType(typeId, userId);
        } else if (sortRecord.sortByCanal) {
          let canalId = sortRecord.id;
          this.getEventsByCanal(canalId, userId);
        }
        //Sinon on recup les événements de tous les utilisateurs // userId est null (ou false)
      } else {
        if (sortRecord.getAll) {
          this.getAllEvents();
        } else if (sortRecord.searchInput) {
          if (sortRecord.val) {
            this.searchInput(sortRecord.val);
          } else {
            this.getAllEvents();
          }
        } else if (sortRecord.getEventsOfTheDay) {
          this.getEventsOfTheDay();
        } else if (sortRecord.sortByType) {
          let typeId = sortRecord.id;
          this.getEventsByType(typeId, false);
        } else if (sortRecord.sortByCanal) {
          let canalId = sortRecord.id;
          this.getEventsByCanal(canalId, false);
        }
      }
    }
  }

  //On récupére tous les événements de tous les utilisateurs
  getAllEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      this.recEvents = data;
      this.errorNotFound = false;
    }, error => {
      if (error.status == 404)
        this.errorNotFound = true;
      if(this.errorNotFound)
        this.eventNotFound = "événément introuvable";
      console.log('oops', error);
    });
  }

  //On cherche tous les événements d'un utilisateur
  getEventsByUser(userId) {
    this.eventService.getAllEventsByUser(userId).subscribe(data => {
      this.recEvents = data;
      this.errorNotFound = false;
    }, error => {
      if (error.status == 404)
        this.errorNotFound = true;
      if(this.errorNotFound)
        this.eventNotFound = "événément introuvable";
      console.log('oops', error);
    });
  }

  //On récupére tous les événements du jour
  getEventsOfTheDay() {
    this.eventService.getEventsOfTheDay().subscribe(data => {
      this.recEvents = data;
      this.errorNotFound = false;
    }, error => {
      if (error.status == 404)
        this.errorNotFound = true;
        console.log('oops', error);
        if(this.errorNotFound)
          this.eventNotFound = "Aucun événément programmé pour aujourd\'hui";
    });
  }

  //On récupére tous les événements du jour pour un utilisateur particulier
  getEventsOfTheDayByUser(userId) {
    this.eventService.getEventsOfTheDayByUser(userId).subscribe(data => {
      this.recEvents = data;
      this.errorNotFound = false;
    }, error => {
      if (error.status == 404)
        this.errorNotFound = true;
      if(this.errorNotFound)
        this.eventNotFound = "Aucun événément programmé pour aujourd\'hui";
      console.log('oops', error);
    });
  }

  //On cherche tous les événements pour un type/catégorie donné
  getEventsByType(typeId, userId) {
    this.eventService.getEventsByType(typeId, userId).subscribe(data => {
      this.recEvents = data;
      this.errorNotFound = false;
    }, error => {
      if (error.status == 404)
        this.errorNotFound = true;
      if(this.errorNotFound)
        this.eventNotFound = "événément introuvable";
      console.log('oops', error);
    });
  }

  //On cherche tous les événements pour un canal donné
  getEventsByCanal(canalId, userId) {
    this.eventService.getMenuByCanal(canalId, userId).subscribe(data => {
      this.recEvents = data;
      this.errorNotFound = false;
    }, error => {
      if (error.status == 404)
        this.errorNotFound = true;
      if(this.errorNotFound)
        this.eventNotFound = "événément introuvable";
      console.log('oops', error);
    });
  }

  //On redirige vers le formulaire d'événement
  setEvent(eventId) {
    this.router.navigate(['/setEvent', eventId]);
  }

  //On redirige vers la page d'affichage d'un événement
  showEvent(eventId) {
    this.router.navigate(['/showEvent', eventId]);
  }

  //On supprime un événement
  delEvent(eventId) {
    this.eventService.deleteEvent(eventId).subscribe(data => {
      //Pour savoir si on vient de my-Events, on regarde si il y'a l'userId qui vient de l'url
      if (this.routeUserId) {
        const currentRoute = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
        });
      } else {
        window.location.reload();
      }
    });
  }

  getUserIdFromRoute() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeUserId = params.get('userId');
    });
  }

  //On trie la list par date rescent first
  sortListDateAsc() {
    this.recEvents = this.sortArrayAscDate(this.recEvents);
    this.pageOfItems = this.recEvents.slice(0, this.pageSize);
    this.jwPagination.setPage(1);
  }

  //On trie la list par date oldest first
  sortListDateDesc() {
    this.recEvents = this.sortArrayDescDate(this.recEvents);
    this.pageOfItems = this.recEvents.slice(0, this.pageSize);
    this.jwPagination.setPage(1);
  }

  //On trie la list par ordre alphabetique ascendant
  sortListAlphaAsc() {
    this.recEvents = this.sortArrayAscAlpha(this.recEvents);
    this.pageOfItems = this.recEvents.slice(0, this.pageSize);
    this.jwPagination.setPage(1);
  }

  //On trie la list par ordre alphabetique descendant
  sortListAlphaDesc() {
    this.recEvents = this.sortArrayDescAlpha(this.recEvents);
    this.pageOfItems = this.recEvents.slice(0, this.pageSize);
    this.jwPagination.setPage(1);
  }

  //Tri sur tableau d'objets Alpha desc
  sortArrayDescAlpha(Array) {
    var sortedArray = Array.sort((b, a) => a.eventName.localeCompare(b.eventName));
    return sortedArray;
  }
  //Tri sur tableau d'objets Alpha asc
  sortArrayAscAlpha(Array) {
    var sortedArray = Array.sort((a, b) => a.eventName.localeCompare(b.eventName));
    return sortedArray;
  }
  //Tri sur tableau d'objets date desc
  sortArrayDescDate(Array) {
    var sortedArray = Array.sort((b, a) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
    return sortedArray;
  }
  //Tri sur les tableau d'objets date desc
  sortArrayAscDate(Array) {
    var sortedArray = Array.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
    return sortedArray;
  }


  //On recherches les éléments qui match pour tout le monde
  searchInput(val) {
    this.eventService.getAllEvents().subscribe(data => {
      this.recEvents = data.filter(el =>
        el.eventName.includes(val),
      );
      this.errorNotFound = false;
    }, error => {
      if (error.status == 404)
        this.errorNotFound = true;
      if(this.errorNotFound)
        this.eventNotFound = "événément introuvable";
        console.log('oops', error);
    });
  }

  //On recherche les éléments qui match pour un utilisateur
  searchInputWithUserId(val, userId) {
    this.eventService.getAllEventsByUser(userId).subscribe(data => {
      this.recEvents = data.filter(el =>
        el.eventName.includes(val),
      );
      this.errorNotFound = false;
    }, error => {
      if (error.status == 404)
        this.errorNotFound = true;
      if(this.errorNotFound)
        this.eventNotFound = "événément introuvable";
        console.log('oops', error);
    });
  }

  toggleDateFilter() {
      this.dateFilterActive = !this.dateFilterActive;
  }

  closeDateFilter() {
    this.dateFilterActive = false;
    if (this.myEvents) {
      this.getEventsByUser(this.userId);
    } else {
      this.getAllEvents();
    }
  }

  onDateChanging($event) {
    var dateDebut = this.dateDebut.nativeElement.value != "" ? this.dateDebut.nativeElement.value : "1000-01-01";
    var dateFin = this.dateFin.nativeElement.value != "" ? this.dateFin.nativeElement.value : "9999-12-31";
    var dates = {dateDebut: dateDebut, dateFin: dateFin};
    if (!this.myEvents) {
      this.eventService.getEventsWithDate(JSON.stringify(dates)).subscribe(data => {
        this.recEvents = data;
        this.errorNotFound = false;
      }, error => {
        if (error.status == 404)
          this.errorNotFound = true;
        if(this.errorNotFound)
          this.eventNotFound = "événément introuvable";
        console.log('oops', error);
      });
    } else {
      this.eventService.getEventsWithDateByUser(JSON.stringify(dates), this.userId).subscribe(data => {
        this.recEvents = data;
        this.errorNotFound = false;
      }, error => {
        if (error.status == 404)
          this.errorNotFound = true;
        if(this.errorNotFound)
          this.eventNotFound = "événément introuvable";
        console.log('oops', error);
      });
    }
  }
}
