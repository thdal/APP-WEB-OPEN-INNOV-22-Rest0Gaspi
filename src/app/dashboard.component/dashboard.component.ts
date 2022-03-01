import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  todoOne: string = "Projet 1";
  todoTwo: string = "Projet 2";
  todoThree: string = "Projet 3";
  todoFour: string = "Projet 4";

  todos = [
    {
      todoName: "Projet 1",
      todoStatus: true,
      image: "http://placehold.it/150"
    },
    {
      todoName: "Projet 2",
      todoStatus: false,
      image: "http://placehold.it/150"
    },
    {
      todoName: "Projet 3",
      todoStatus: true,
      image: "http://placehold.it/150"
    },
    {
      todoName: "Projet 4",
      todoStatus: false,
      image: "http://placehold.it/150"
    }
  ]
  
  } 