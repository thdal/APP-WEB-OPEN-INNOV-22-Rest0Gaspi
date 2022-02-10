import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dlg',
  templateUrl: './logout-dlg.component.html',
  styleUrls: ['./logout-dlg.component.scss']
})
export class LogoutDlgComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LogoutDlgComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
