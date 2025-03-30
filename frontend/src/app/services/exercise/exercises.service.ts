import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Exercise } from '../../../../backend/models/exercise.ts';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  url = 'http://localhost:2020/exercises/';

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

  deleteExercise(exercise: string) {
    return this.http.delete(this.url, {body: { name: exercise }});
  }

  addWeightProgression(exercise: string, weightProgression: any ) {
    const url = this.url + 'exercise-wp';
    return this.http.post(url, { name: exercise, weightProgression: weightProgression });
  }

}
