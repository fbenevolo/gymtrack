import { Component, inject } from '@angular/core';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExercisesService } from '../../services/exercises.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faXmark, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';

import dayjs from "dayjs";
import 'dayjs/locale/pt';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);
dayjs.locale('pt');

@Component({
  selector: 'app-exercises',
  imports: [NgIf, NgFor, TitleCasePipe, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent {

  formBuilder = inject(FormBuilder)

  faCheck = faCheck;
  faXmark = faXmark;
  faTrash = faTrash;
  faPlus = faPlus;

  exerciseData: any;
  exerciseGroupedData: any;
  dataReady = false;

  newExerciseForm = this.formBuilder.group({
    name: ['', Validators.required],
    pr: ['', Validators.required],
    weekDay: ['']
  });

  incorrectFormMessage = false;

  // control variables to display (or not) certain elements
  newExerciseFormActiveArray: Array<boolean> = new Array(7).fill(false);
  displayDayExercise: Array<boolean> = new Array(7).fill(false);
  removeExerciseButtonArray: Array<boolean> = [];

  weekDays = dayjs.weekdays();

  constructor(private exercisesService: ExercisesService ) {}

  ngOnInit() {
    this.exercisesService.getExercises().subscribe((data: any) => { 
      this.exerciseData = data
    });

    this.exercisesService.getGroupedExercises().subscribe((data: any) => {
      this.exerciseGroupedData = data;
      this.dataReady = true;
    });
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

  addExercise(exercise: any, weekDay: string) {
    exercise.weekDay = weekDay;
    this.exercisesService.addExercise(exercise).subscribe();
  }

  deleteExercise(name: string) {
    this.exercisesService.deleteExercise(name).subscribe();
  }

  showNewExerciseForm(i: number) { this.newExerciseFormActiveArray[i] = !this.newExerciseFormActiveArray[i]; }
  showExercises(i: number) { 
    this.displayDayExercise[i] = !this.displayDayExercise[i]; 

    if (this.displayDayExercise[i]) {
      let length = this.exerciseGroupedData[i][this.weekDays[i]].length;
      this.removeExerciseButtonArray = new Array(length).fill(false);
    }

  }

  showConfirmDeleteOption(i: number) {
    this.removeExerciseButtonArray[i] = !this.removeExerciseButtonArray[i];
  }

  showIncorrectFormMessage() {
    this.incorrectFormMessage = !this.incorrectFormMessage; 
  }
}
