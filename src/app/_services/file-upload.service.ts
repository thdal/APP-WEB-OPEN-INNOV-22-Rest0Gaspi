import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private httpClient: HttpClient;

  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = '';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient.post<any>(endpoint, formData);
  }
}
