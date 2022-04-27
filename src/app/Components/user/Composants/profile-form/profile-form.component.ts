import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../_services/user.service";
import {environment} from "../../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  userForm: FormGroup;
  public currentUser;
  userId: number;
  userProfilesRecord : [];
  recUser = [];
  submitted = false;
  profileType: string;
  fileToUpload: File | null = null;
  userImg = false;
  apiUrl = environment.apiBaseUrl;
  loading = false;
  mobile = false;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder,private toastr: ToastrService,) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.userId = this.currentUser.id;
    if(this.currentUser.profile_id == 1){
      this.profileType = 'Organisateur';
    }else if(this.currentUser.profile_id == 2){
      this.profileType = 'Participant';
    }else if(this.currentUser.profile_id == 3){
      this.profileType = 'Administrateur';
    }
  }

  ngOnInit(): void {
    console.log(this.currentUser);
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
    }
    this.getUserProfiles();
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.getUserData();
  }

  get fval() { return this.userForm.controls; }

  getUserData(){
    this.userService.getUserWithId(this.userId).subscribe(data => {
      this.recUser = data;
      this.userImg = (data.userImg == 0) ? false : true ;
      this.userForm.controls.firstName.setValue(data.firstName);
      this.userForm.controls.lastName.setValue(data.lastName);
      this.userForm.controls.email.setValue(data.email);
    }, error => {
      if (error.status == 404)
        console.log('oops', error);
    });
  }

  delRow() {
      //Il y'a une contrainte d'intégrité, on supprime d'abord le profile, ensuite l'utilisateur de la bdd.
      this.userService.removeUserProfile(this.currentUser.id, this.currentUser.profile_id).subscribe(data => {
        this.userService.removeUser(this.currentUser.id).subscribe(data => {
            this.router.navigate(['/login']); // navigate to same route
        });
      });
  }

  getUserProfiles(){
    this.userService.getUserProfiles().subscribe(data => {
      this.userProfilesRecord = data;
    },error => {
      console.log('oops', error);
    });
  }

  //Preview de l'image dans le dom
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if(this.userImg){
      (document.getElementById('outputImgSet') as HTMLImageElement).src = URL.createObjectURL(this.fileToUpload);
    }else{
      (document.getElementById('output') as HTMLImageElement).src = URL.createObjectURL(this.fileToUpload);
    }
  }

  //méthode post du formulaire
  onFormSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.loading = true;
    //Ajoute l'userId à l'object eventForm
    this.userForm.addControl('userId', this.formBuilder.control(this.currentUser.id));
    //Part img
    if(this.fileToUpload){
      var formData = new FormData();
      formData.append("userImgFile", this.fileToUpload);
      this.userForm.addControl('userImg', this.formBuilder.control(true));
    }else{
      this.userForm.addControl('userImg', this.formBuilder.control(this.currentUser.userImg || false));
    }
    this.userService.updateUser(this.userId, this.userForm.value, formData).subscribe(
      (data)=>{
        this.loading = false;
       // alert('User updated successfully!!');
        //Je mets à jour le localStorage pour afficher l'image dans le menu top
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser.userImg)
          user.userImg = this.currentUser.userImg
        else{
          if(this.fileToUpload)
            user.userImg = 1;
          else
            user.userImg = 0;
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.reload();
      },
      (error)=>{
        this.toastr.error(error.error.message, 'Error');
        this.loading = false;
      }
    )
  }
  //Image dynamique en fonction du genre et du profile
  //Genres: 1 = Femme, 2 = Homme
  //Profiles: 1=Organisateur, 2=Participant, 3=Administrateur
  getProfileImage() {
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
