import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";

import { MenuRestauListComponent } from './menu-restau-list.component';

describe('EventListComponent', () => {
  let component: MenuRestauListComponent;
  let fixture: ComponentFixture<MenuRestauListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      declarations: [ MenuRestauListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRestauListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

//Tests des tris sur nos listes
  describe('Menu list TDD', () => {
    //Verifie que la fonction trie bien notre objet par ordre alphabétique desc (z à a) dans notre controller
    it('should be sorted alphabetically DESC', () => {
      var tab1 = [{eventName: 'A'},{eventName: 'B'},{eventName: 'C'},{eventName: 'D'}];
      var tab2 = [{eventName: 'D'},{eventName: 'C'},{eventName: 'B'},{eventName: 'A'}];
      expect(component.sortArrayDescAlpha(tab1)).toEqual(tab2);
    });
    //Verifie que la fonction trie bien notre objet par ordre alphabétique asc (a à z) dans notre controller
    it('should be sorted alphabetically ASC', () => {
      var tab1 = [{eventName: 'A'},{eventName: 'B'},{eventName: 'C'},{eventName: 'D'}];
      var tab2 = [{eventName: 'D'},{eventName: 'C'},{eventName: 'B'},{eventName: 'A'}];
      expect(component.sortArrayAscAlpha(tab2)).toEqual(tab1);
    });
    //Verifie que la fonction trie bien notre objet par date desc (anciennes avant) dans notre controller
    it('should be sorted by date DESC OLDEST FIRST', () => {
      var tab1 = [{eventDate: '2021-12-01'},{eventDate: '2021-11-01'},{eventDate: '2021-10-01'},{eventDate: '2021-09-01'}];
      var tab2 = [{eventDate: '2021-09-01'},{eventDate: '2021-10-01'},{eventDate: '2021-11-01'},{eventDate: '2021-12-01'}];
      expect(component.sortArrayDescDate(tab1)).toEqual(tab2);
    });
    //Verifie que la fonction trie bien notre objet par date asc (récentes avant) dans notre controller
    it('should be sorted by date ASC RECENT FIRST', () => {
      var tab1 = [{eventDate: '2021-12-01'},{eventDate: '2021-11-01'},{eventDate: '2021-10-01'},{eventDate: '2021-09-01'}];
      var tab2 = [{eventDate: '2021-09-01'},{eventDate: '2021-10-01'},{eventDate: '2021-11-01'},{eventDate: '2021-12-01'}];
      expect(component.sortArrayAscDate(tab2)).toEqual(tab1);
    });
  });
});


