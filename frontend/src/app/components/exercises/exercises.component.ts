import { Component, inject } from '@angular/core';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExercisesService } from '../../services/exercises.service';

import { MatTooltipModule } from '@angular/material/tooltip';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faXmark, faTrash, faPlus, faRocket } from '@fortawesome/free-solid-svg-icons';

import dayjs from "dayjs";
import 'dayjs/locale/pt';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);
dayjs.locale('pt');

@Component({
  selector: 'app-exercises',
  imports: [NgIf, NgFor, TitleCasePipe, ReactiveFormsModule, FontAwesomeModule, MatTooltipModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent {

  formBuilder = inject(FormBuilder);

  weekDaysShort = dayjs.weekdaysShort();
  weekDays = dayjs.weekdays();

  faCheck = faCheck;
  faXmark = faXmark;
  faTrash = faTrash;
  faPlus = faPlus;
  faRocket = faRocket;

  exerciseData: any;
  exerciseGroupedData: any;
  dataReady = false;

  exercisesDisplayed = false;
  selectedDayExercises: any;
  selectedDayShort: string = '';
  selectedDay: string = '';
  removeExerciseButtonArray: Array<boolean> = [];

  exerciseRemoved = false;

  newExerciseForm = this.formBuilder.group({
    name: ['', Validators.required],
    pr: ['', Validators.required],
    weekDay: ['']
  });

  newExerciseFormActiveArray: { [day: string]: boolean } = this.weekDays.reduce((acc: any, day) => {
    acc[day] = false;
    return acc;
  }, {});

  newWeightProgressionForm = this.formBuilder.group({
    date: ['', Validators.required],
    weight: ['', Validators.required],
    reps: ['', Validators.required],
  })
  
  weightProgressions: { [exercise: string]: boolean } = {};
  newWeightProgressionFormActiveArray: Array<boolean> = [];
  incorrectFormMessage = false;
  
  constructor(private exercisesService: ExercisesService ) {}

  ngOnInit() {
    this.exercisesService.getExercises().subscribe((data: any) => { 
      this.exerciseData = data;
    });

    this.exercisesService.getGroupedExercises().subscribe((data: any) => {
      this.exerciseGroupedData = data;
      this.dataReady = true;

      this.exercisesDisplayed = true;
      this.selectedDayExercises = this.exerciseGroupedData[0]['domingo'];
      this.selectedDay = 'domingo';
      this.selectedDayShort = 'dom';
    });
  
  }
  
  addExercise(exercise: any, weekDay: string) {
    exercise.weekDay = weekDay;
    this.exercisesService.addExercise(exercise).subscribe();
  }

  deleteExercise(name: string) {
    this.exerciseRemoved = true;
    this.exercisesService.deleteExercise(name).subscribe();
  }

  addWeightProgression(exercise: string, weightProgression: any) {
    this.exercisesService.addWeightProgression(exercise, weightProgression).subscribe();
  }

  showExercises(i: number) { 
    /*
      Receives a number that is the index of displayDayExerciseArray.
      This array holds which day card is expanded, that is, which
      exercises from which day are being showed.

      Besides, it fills two arrays:
      - the one that holds the state of delete buttons (if true, shows a confirm menu. else, only displays the button with garbage icon)
      - the one that holds the state of new weight progression form (if it is active or not)
      - 
    */     
    this.selectedDayShort = this.weekDaysShort[i];
    this.selectedDay = this.weekDays[i]
    this.selectedDayExercises = this.exerciseGroupedData[i][this.selectedDay];
    this.exercisesDisplayed = true;

    if (this.selectedDayExercises) {
      const length = this.selectedDayExercises.length;
      this.removeExerciseButtonArray = new Array(length).fill(false);
      this.newWeightProgressionFormActiveArray = new Array(length).fill(false);
    }
  }

  showWeightProgressions(exercise: string) {
    this.weightProgressions[exercise] = !this.weightProgressions[exercise]; 
  }
  
  showConfirmDelete(i: number) { this.removeExerciseButtonArray[i] = !this.removeExerciseButtonArray[i]; }

  showNewExerciseForm(day: string) { this.newExerciseFormActiveArray[day] = !this.newExerciseFormActiveArray[day]; }
  showNewWeightProgressionForm(i: number) { this.newWeightProgressionFormActiveArray[i] = !this.newWeightProgressionFormActiveArray[i]; }
  showIncorrectFormMessage() { this.incorrectFormMessage = !this.incorrectFormMessage;  }
  
}
