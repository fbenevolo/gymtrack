import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Exercise } from '../../../../backend/models/exercise.ts';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  url = 'http://localhost:2020/';

  constructor(private http: HttpClient) {}

  getExercises() {
    return this.http.get<any>(this.url);
  }

  getGroupedExercises() {
    return this.http.get<any>(this.url + 'group-exercises');
  }

  addExercise(data: any) {
    return this.http.post<any>(this.url, data);
  }

  deleteExercise(name: string) {
    return this.http.delete(this.url, {body: { name: name }});
  }
}
