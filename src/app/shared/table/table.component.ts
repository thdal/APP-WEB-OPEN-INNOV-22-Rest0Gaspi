import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  private _tableData: any[] = [];

  @Input() columnHeader: any;
  @Input() hasDuplicate: boolean = false;
  @Input() hasDragAndDrop: boolean = false;


  @Output() onEdit : EventEmitter<any> = new EventEmitter();
  @Output() onDelete : EventEmitter<any> = new EventEmitter();
  @Output() onDuplicate : EventEmitter<any> = new EventEmitter();
  @Output() onDrop : EventEmitter<any> = new EventEmitter();


  pageEvent: PageEvent | undefined;
  pageSize:number = 10;

  sortingStatus:number = 0;
  headerIndex:number = 0;

  objectKeys = Object.keys;
  dataSource: any;

  _tableDataCopy: any[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.pageEvent = new PageEvent();
    this.initPaginatorText();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private initPaginatorText = async()  => {
    const paginatorIntl = this.paginator?._intl;
    if (paginatorIntl) {
      paginatorIntl.firstPageLabel = await this.translate.get('paginator.first').toPromise();
      paginatorIntl.nextPageLabel = await this.translate.get('paginator.next').toPromise();
      paginatorIntl.previousPageLabel = await this.translate.get('paginator.prev').toPromise();
      paginatorIntl.lastPageLabel = await this.translate.get('paginator.last').toPromise();
    }
  }

  @Input()
  set tableData(data: any[]) {
    this._tableData = data;
    this._tableDataCopy = JSON.parse(JSON.stringify(this._tableData)); //On se sert des json pour cloner
    this.makeData();
  }

  /**
   * Be sure MatTabaleDataSOurce is inited before send data
   */
  private makeData(): void {
    if (this.dataSource) {
      this.dataSource.data = this._tableData;
    } else {
      this.dataSource = new MatTableDataSource(this._tableData);
      this.dataSource.paginator = this.paginator;
    }
  }

  edit(id: number): void {
    this.onEdit.emit(id);
  }

  delete(id: number): void {
    this.onDelete.emit(id);
  }

  duplicate(id: number): void {
    this.onDuplicate.emit(id);
  }

  drop(event: CdkDragDrop<string[]>) {
    const previousIndex = this.dataSource.data.findIndex((row: any) => row === event.item.data);
    moveItemInArray(this.dataSource.data,previousIndex, event.currentIndex);
    this.dataSource.data = this.dataSource.data.slice();
    this.onDrop.emit({dataSource : this.dataSource.data });
  }


  sortTable(index: number, key: string): void{
    this.headerIndex = index;
    if(this.sortingStatus < 2){
      this.sortingStatus++;
    }else{
      this.sortingStatus = 0;
    }

    if(this.sortingStatus == 1){
      this.dataSource.data = JSON.parse(JSON.stringify(this.dataSource.data.sort(function(a:any, b:any) {
        (a[key]! != undefined || a[key]! != null) ? a[key] = a[key] : a[key] = "";
        (b[key]! != undefined || b[key]! != null) ? b[key] = b[key] : b[key] = "";
        return ((a[key].toLowerCase().trim() > (b[key].toLowerCase()).trim()) ? 1 : -1)//On se sert des json pour cloner
      })));
    }else if(this.sortingStatus == 2){
      this.dataSource.data = JSON.parse(JSON.stringify(this.dataSource.data.sort(function(a:any, b:any) {
        (a[key]! != undefined || a[key]! != null) ? a[key] = a[key] : a[key] = "";
        (b[key]! != undefined || b[key]! != null) ? b[key] = b[key] : b[key] = "";
        return ((a[key].toLowerCase()).trim() > (b[key].toLowerCase()).trim() ? -1 : 1)//On se sert des json pour cloner
      })));
    }else{
      this.dataSource.data = JSON.parse(JSON.stringify(this._tableDataCopy));//On se sert des json pour cloner
    }
  }

  getPathIcon(index: number): any{
    if(this.headerIndex == index){
      if(this.sortingStatus == 0){
        return "assets/images/table/default.svg";
      }
      if(this.sortingStatus == 1){
        return "assets/images/table/asc.svg";
      }
      if(this.sortingStatus == 2){
        return "assets/images/table/desc.svg";
      }
    }else{
      return "assets/images/table/default.svg";
    }
  }

}
