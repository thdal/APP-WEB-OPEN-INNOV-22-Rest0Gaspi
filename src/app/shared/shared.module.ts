import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { TableComponent } from './table/table.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { StylePaginatorDirective } from './table/style-paginator.directive';
import { ToolbarBottomComponent } from './toolbar/bottom/toolbar-bottom.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ValidDlgComponent } from './dialog/valid/valid-dlg.component';
import { RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import { LogoutDlgComponent } from './dialog/logout/logout-dlg.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        DragDropModule,
        TranslateModule
    ],
  declarations: [
      LogoutDlgComponent,
      StylePaginatorDirective,
      TableComponent,
      ToolbarComponent,
      ToolbarBottomComponent,
      ValidDlgComponent
  ],
  exports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    ToolbarComponent,
    ToolbarBottomComponent,
    TableComponent
  ],
})
export class SharedModule { }
