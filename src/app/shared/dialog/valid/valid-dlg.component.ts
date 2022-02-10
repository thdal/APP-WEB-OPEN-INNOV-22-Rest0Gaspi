import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-valid-dlg',
  templateUrl: './valid-dlg.component.html',
  styleUrls: ['./valid-dlg.component.scss']
})
export class ValidDlgComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, content: string, info: string}) { }

  ngOnInit(): void {
  }

}
