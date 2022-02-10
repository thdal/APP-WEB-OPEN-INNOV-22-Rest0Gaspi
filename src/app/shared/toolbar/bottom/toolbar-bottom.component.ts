import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-toolbar-bottom',
  templateUrl: './toolbar-bottom.component.html',
  styleUrls: ['./toolbar-bottom.component.scss']
})
export class ToolbarBottomComponent implements OnInit {

  @Input() isNew: boolean = false;

  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onDuplicate: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(private navigation: NavigationService) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.onDelete.emit();
  }

  duplicate(): void {
    this.onDuplicate.emit();
  }

  cancel(): void {
    // this.onCancel.emit();
    this.navigation.back();
  }

  save(): void {
    this.onSave.emit();
  }

}
