import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../../../../_services/authentication.service';
import $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorService = false;
  errorMsg = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService : AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

// for accessing to form fields
  get fval() { return this.loginForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.fval.email.value, this.fval.password.value)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          //this.toastr.error(error.error.message, 'Error');
          console.log(error);
          this.errorMsg = error.error.message;
          this.errorService = true;
          this.loading = false;
        });
  }

  visiteWebSite(){
    document.getElementById('id01').style.display='block';
  }

  yesRGPD(){
    this.authenticationService.visite();
    this.router.navigate(['/']);
  }

  //Call la route de la page des cgu
  goToCgu() {
    this.authenticationService.visite();
    this.router.navigate(['/cgu']);
  }

  //Call la route de la page des privacy policy
  goToPrivacyPolicy() {
    this.authenticationService.visite();
    this.router.navigate(['/privacyPolicy']);
  }

}
