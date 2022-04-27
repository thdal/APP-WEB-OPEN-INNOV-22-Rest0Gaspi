import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { menuType } from "../_models/menuType";
import { Menu } from "../_models/menu";

@Injectable({
  providedIn: 'root'
})
export class MenuRestauService {

  public eventType: Observable<menuType>;

  constructor(private http: HttpClient) { }

  //Tous les événements
  getAllEvents(){
    return this.http.get<any>(`api/events`);
  }
  //Les événements d'un utilisateur particulier (l'utilisateur connecté)
  getAllEventsByUser(userId){
    return this.http.get<any>(`api/events/${userId}`);
  }
  //Les événements du jour
  getEventsOfTheDay(){
    return this.http.get<any>(`api/menu/oftheday`);
  }
  //Les évenements du jour pour un utilisateur
  getEventsOfTheDayByUser(userId){
    return this.http.get<any>(`api/events/oftheday/${userId}`);
  }
  //Un événement spécifique avec son id
  getEventById(eventId){
    return this.http.get<any>(`api/event/${eventId}`);
  }
  //Les événément par type
  getEventsByType(typeId, userId){
    //let params = new HttpParams().set("typeId",typeId); //Create new HttpParams
    return this.http.get<any>(`api/events/type/${typeId}/${userId}`); //On passe dans l'url pour l'instant
  }
  //Les événément par canal
  getMenuByCanal(canalId, userId){
    return this.http.get<any>(`api/events/menu/${canalId}/${userId}`); //On passe dans l'url pour l'instant
  }
  //Les catégories/types d'événements(Culturel, artistique ect..)
  getMenuTypes() {
      return this.http.get<any>(`api/menuTypes`);
  }
  //Les canaux d'événements (Twitch, Facebook ect..)
  getMenuCanals() {
    return this.http.get<any>(`api/eventCanals`);
  }
  //Cherche les événements entre deux dates
  getEventsWithDate(dates) {
    console.log(dates);
    let params = new HttpParams().set('dates', dates);
    console.log(params);
    return this.http.get<any>(`api/eventsWithDates`, {params: params});
  }
  //Cherche les événements entre deux dates poru un utilisateur
  getEventsWithDateByUser(dates, userId) {
    let params = new HttpParams().set('dates', dates);
    return this.http.get<any>(`api/eventsWithDates/${userId}`, {params: params});
  }
  //On post un événement
  postEvent(event: Menu, formData) {
    //Si on a pas d'image on force qd même le formdata
    if(!formData){
      formData = new FormData();
      formData.append("event", JSON.stringify(event));
    }else{
      formData.append("event", JSON.stringify(event));
    }
    return this.http.post<any>(`api/events`, formData);
  }
  //On update un événement
  updateEvent(eventId, event: Menu, formData) {
    //Si on a pas d'image on force qd même le formdata
    if(!formData){
      formData = new FormData();
      formData.append("event", JSON.stringify(event));
    }else{
      formData.append("event", JSON.stringify(event));
    }
    return this.http.put<any>(`api/events/${eventId}`, formData);
  }
  //On supprime un événement
  deleteEvent(eventId){
    return this.http.delete<any>(`api/event/${eventId}`);
  }
}
