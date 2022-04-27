import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastrModule, ToastrService} from "ngx-toastr";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule, ReactiveFormsModule, ToastrModule.forRoot({                positionClass :'toast-bottom-right'
      })],
      declarations: [ RegisterComponent ],
      providers: [{provide: ToastrService, useClass: ToastrService}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
  describe('Register TDD - Password should be complex ', () => {
    // La fonction testée doit retourner true si le mot de passe est dans le bon format, false sinon
    // D'après l'ANSSI (Agence nationale de la sécurité des systèmes d'information)
    // un bon mot de passe doit faire 12 caractères au minimum
    // comprenant des majuscules, minuscules, chiffres et caractères spéciaux
    it('Password shouldn t be null', () => {
      var testPassword1 = null;
      // Le mot de passe ne doit pas etre null
      expect(component.passwordVerification(testPassword1)).toBeFalse();
    });
    it('Password should be 12 characters long', () => {
      var testPassword2 = 'abcdefghijk' // 11 caractères
      // Ne doit pas faire moins de 12 caractères
      expect(component.passwordVerification(testPassword2)).toBeFalse();
    });
    it('Password should be 12 characters long and contain at least 1 number and 1 special char', () => {
      var testPassword3 = 'abcdefghijkl' // 12 caractères
      //Doit contenir au moins 1 nombre et 1 caractère spécial
      expect(component.passwordVerification(testPassword3)).toBeFalse();
    });
    it('Password is in the right format ', () => {
      var testPassword4 = '1@cdefghijkl' // 12 caractères contenant 1 nombre et 1 caractère spécial
      //Le mot de passe est valide, return true
      expect(component.passwordVerification(testPassword4)).toBeTrue();
    });
  });
});
