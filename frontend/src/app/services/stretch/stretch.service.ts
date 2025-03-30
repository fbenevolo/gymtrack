import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StretchService {

  url = 'http://localhost:2020/stretches/';

  constructor(private http: HttpClient) { }

  getStretches() {
    return this.http.get<any>(this.url);
  }

  addStretch(stretch: any) {
    return this.http.post<any>(this.url, stretch);
  }
}
