import {Component, OnInit, ElementRef, Input} from '@angular/core';
import { MenuRestauService} from "../../../../_services/menu-restau.service";
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Menu} from "../../../../_models/menu";
import { DatePipe } from '@angular/common';
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";


@Component({
  selector: 'app-menu-restau-form',
  templateUrl: './menu-restau-form.component.html',
  styleUrls: ['./menu-restau-form.component.css']
})
export class MenuRestauFormComponent implements OnInit {
  public currentUser;
  eventForm: FormGroup;
  eventTypesRecord : [];
  eventCanalsRecord : [];
  submitted = false;
  loading = false;
  fileToUpload: File | null = null;
  @Input() setEvent: boolean;
  eventId : any;
  routeUserId: any;
  eventImg = false;
  apiUrl = environment.apiBaseUrl;
  mobile = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private eventService: MenuRestauService, private toastr: ToastrService,
              private htmlelem: ElementRef, private activatedRoute: ActivatedRoute, private datePipe: DatePipe) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    console.log(this.currentUser);
  }

  ngOnInit(): void {
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
      this.eventForm = this.formBuilder.group({
        eventName: ['', Validators.required],
        eventDate: ['', Validators.required],
        eventHour: [''],
        eventLink: ['', Validators.required],
        eventAddress: ['', Validators.required],
        eventDescription: [''],
        typeEventId: [1, Validators.required],
        canalEventId: [1, Validators.required]
    });
      if(this.setEvent){
        this.getEventbyId();
      }
    this.getMenuTypes();
    this.getMenuCanals();
  }
  //Récupére les catégories/types d'événements (Culturel, Artistique ect..)
  getMenuTypes(){
    this.eventService.getMenuTypes().subscribe(data => {
      this.eventTypesRecord = data;
    });
  }
  get fval() { return this.eventForm.controls; }
  //Récupére les canaux d'événements (Twitch, Facebook ect..)
  getMenuCanals(){
    this.eventService.getMenuCanals().subscribe(data => {
      this.eventCanalsRecord = data;
    });
  }
  //Récupére un événement particulier (pour la modification)
  getEventbyId(){
    //On récupére l'id depuis la route avec un observable
    this.activatedRoute.paramMap.subscribe(params => {
      this.eventId = params.get('eventId');
      //On envoie l'id au service et on met à jour le formulaire
      this.eventService.getEventById(this.eventId).subscribe(data => {
        this.eventImg = (data.eventImg == 0) ? false : true ;
        this.eventForm.controls.eventName.setValue(data.eventName);
        this.eventForm.controls.eventDate.setValue(this.datePipe.transform(data.eventDate,"yyyy-MM-dd"));
        this.eventForm.controls.eventHour.setValue(data.eventHour);
        this.eventForm.controls.typeEventId.setValue(data.typeEventId);
        this.eventForm.controls.canalEventId.setValue(data.canalEventId);
        this.eventForm.controls.eventLink.setValue(data.eventLink);
        this.eventForm.controls.eventAddress.setValue(data.eventAddress);
        this.eventForm.controls.eventDescription.setValue(data.eventDescription);
      });
    });
  }
  //Preview de l'image dans le dom
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if(this.eventImg){
      (document.getElementById('outputImgSet') as HTMLImageElement).src = URL.createObjectURL(this.fileToUpload);
    }else{
      (document.getElementById('output') as HTMLImageElement).src = URL.createObjectURL(this.fileToUpload);
    }
  }

  //méthode post du formulaire
  onFormSubmit() {
    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    }
    this.loading = true;
    //Ajoute l'userId à l'object eventForm
    this.eventForm.addControl('userId', this.formBuilder.control(this.currentUser.id));
    //Part img
    if(this.fileToUpload){
      var formData = new FormData();
      formData.append("eventImgFile", this.fileToUpload);
      this.eventForm.addControl('eventImg', this.formBuilder.control(true));
    }else{
      this.eventForm.addControl('eventImg', this.formBuilder.control(this.eventImg));
    }
    //On post l'évéenement
    if(!this.setEvent){
      this.eventService.postEvent(this.eventForm.value, formData).subscribe(
        (data)=>{
          this.loading = false;
          //alert('Menu posted successfully!!');
          this.router.navigate(['']);
        },
        (error)=>{
          this.toastr.error(error.error.message, 'Error');
          this.loading = false;
        }
      )
    }else{
      this.eventService.updateEvent(this.eventId, this.eventForm.value, formData).subscribe(
        (data)=>{
          this.loading = false;
         // alert('Menu updated successfully!!');
          this.router.navigate(['/eventsList', this.currentUser.id]);
          window.location.reload();
        },
        (error)=>{
          this.toastr.error(error.error.message, 'Error');
          this.loading = false;
        }
      )
    }
  }

  //On supprime un événement
  delEvent(){
    this.eventService.deleteEvent(this.eventId).subscribe(data => {
      if(this.eventId){
        this.router.navigate(['/eventsList', this.currentUser.id]);
      }
    });
  }
}
