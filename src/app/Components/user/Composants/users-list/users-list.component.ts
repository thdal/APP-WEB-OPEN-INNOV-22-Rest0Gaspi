import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../_services/user.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  recUsers = new Array();
  editToggle = false;
  editToggleId:number;
  control: FormArray;
  userTable: FormGroup;
  touchedRows: any;
  loading = false;
  submitted = false;

  constructor(private router: Router,private userService: UserService,private fb: FormBuilder) { }

  fval(rowIndex) {
    const control = this.userTable.get('tableRows') as FormArray;
    var rowControls = control.controls[rowIndex];
    return rowControls;
  }

  ngOnInit(): void {
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.getAllWithProfiles();
    this.touchedRows = [];

  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  getAllWithProfiles(){
    //Genres: 1 = femme, 2 = Homme
    //Profiles: 1=Organisateur, 2=Participant, 3=Administrateur
    this.userService.getAllWithProfiles().subscribe(data => {
        this.recUsers = data;
        data.forEach((elem => {
          this.initTableRows(elem);
        }));
    });
  }

  initTableRows(elem) {
    console.log(elem);
    const control =  this.userTable.get('tableRows') as FormArray;
    var fbGroup = this.fb.group({
      id: elem.id,
      genre_id: [elem.genre_id, Validators.required],
      firstName: [elem.firstName, Validators.required],
      lastName: [elem.lastName, Validators.required],
      profile_id: [elem.profile_id, Validators.required],
      email: [elem.email, Validators.required],
      isBanned: [elem.isBanned, Validators.required],
      userImg: elem.userImg
    });
    control.push(fbGroup);
  }

  addRow() {
    //Si on est déjà en edition, return.
    if(this.editToggle)
      return;
    const control =  this.userTable.get('tableRows') as FormArray;
    const alreadyCLicked = control.value.findIndex(el => el.id === "");
    //On ajoute une seule ligne à la fois -1 si index == "" n'existe pas dans le tableau
    if(alreadyCLicked != -1)
      return;
    var fbGroup = this.fb.group({
      id: '',
      genre_id: ['2', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profile_id: ['2', Validators.required],
      email: ['', Validators.required],
      isBanned: [false, Validators.required],
      userImg: false
    });
    control.push(fbGroup);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  editRow(group: any) {
    if(group == null){
      this.editToggleId = null;
      this.getAllWithProfiles();
    }else{
      this.editToggle = !this.editToggle;
      this.editToggleId = group.value.id;
    }
  }

  cancelEditRow(group: any) {
    if(group.controls.id.value != ""){
      //Recup l'état initial de nos data de l'init du composant
      const tmpLine = this.recUsers.find(element => element.id == group.controls.id.value);
      //Remet à 0 les valeurs de la ligne
      group.controls.firstName.setValue(tmpLine.firstName);
      group.controls.lastName.setValue(tmpLine.lastName);
      group.controls.email.setValue(tmpLine.email);
      group.controls.genre_id.setValue(tmpLine.genre_id);
      group.controls.profile_id.setValue(tmpLine.profile_id);
      group.touched = false ;
    }else{
      const control = this.userTable.get('tableRows') as FormArray;
      control.removeAt(control.value.findIndex(el => el.id === ""))
    }
    this.editToggle = !this.editToggle;
    this.editToggleId = null;
  }

  delRow(group: any) {
    if(group.controls.id.value != ""){
      var userId = group.controls.id.value;
      var profileId = group.controls.profile_id.value;
      //Il y'a une contrainte d'intégrité, on supprime d'abord le profile, ensuite l'utilisateur de la bdd.
      this.userService.removeUserProfile(userId, profileId).subscribe(data => {
          this.userService.removeUser(userId).subscribe(data => {
            const currentRoute = this.router.url;//Recup la route actuelle pour recharger
            //Redirection pour bien recharger la vue
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
            });
          });
      })
    }
    this.editToggle = !this.editToggle;
    this.editToggleId = null;
  }

  submitForm(rowIndex) {
    const control = this.userTable.get('tableRows') as FormArray;
    var rowControls = control.controls[rowIndex];
    this.submitted = true;
// return for here if form is invalid
    if (rowControls.invalid) {
      return;
    }
    this.loading = true;

    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    //On ajoute le mot de passe à la main pour l'instant
    //L'idée serait d'envoyer un mail au nouvel utilisateur avec un mot de passe généré aléatoirement
    this.touchedRows[0].password = "titre-epsi";
    //En création
    if(this.touchedRows[0].id == ""){
      this.userService.register(this.touchedRows[0]).subscribe(data =>{
        const currentRoute = this.router.url;//Recup la route actuelle pour recharger
        //Redirection pour bien recharger la vue
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
        });
      });
    }else{
      //En update
      this.userService.updateUserFromAdmin(this.touchedRows[0].id, this.touchedRows[0]).subscribe(data =>{
        this.userService.updateUserProfile(this.touchedRows[0].id, this.touchedRows[0].profile_id).subscribe(data => {
          const currentRoute = this.router.url;//Recup la route actuelle pour recharger
          //Redirection pour bien recharger la vue
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentRoute]); // navigate to same route
          });
        });
      });
    }
  }
}
