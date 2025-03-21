import { Component, inject } from '@angular/core';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExercisesService } from '../../services/exercises.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faXmark, faTrash, faPlus, faRocket } from '@fortawesome/free-solid-svg-icons';

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
  faRocket = faRocket;

  exerciseData: any;
  exerciseGroupedData: any;
  dataReady = false;

  newExerciseForm = this.formBuilder.group({
    name: ['', Validators.required],
    pr: ['', Validators.required],
    weekDay: ['']
  });

  newWeightProgressionForm = this.formBuilder.group({
    date: ['', Validators.required],
    weight: ['', Validators.required],
    reps: ['', Validators.required],
  })

  incorrectFormMessage = false;

  // control variables to display (or not) certain elements
  newWeightProgressionFormActiveArray: Array<boolean> = [];
  newExerciseFormActiveArray: Array<boolean> = new Array(7).fill(false);
  displayDayExerciseArray: Array<boolean> = new Array(7).fill(false);
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
  
  addExercise(exercise: any, weekDay: string) {
    exercise.weekDay = weekDay;
    this.exercisesService.addExercise(exercise).subscribe();
  }

  deleteExercise(name: string) {
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
    this.displayDayExerciseArray[i] = !this.displayDayExerciseArray[i]; 

    if (this.displayDayExerciseArray[i]) {
      // this length is the number of exercises of the day
      let length = this.exerciseGroupedData[i][this.weekDays[i]].length;

      this.removeExerciseButtonArray = new Array(length).fill(false);
      this.newWeightProgressionFormActiveArray = new Array(length).fill(false);
    }
  }

  showNewExerciseForm(i: number) { 
    this.newExerciseFormActiveArray[i] = !this.newExerciseFormActiveArray[i]; 
  }

  showNewWeightProgressionForm(i: number) {
    this.newWeightProgressionFormActiveArray[i] = !this.newWeightProgressionFormActiveArray[i]; 
  }

  showIncorrectFormMessage() { this.incorrectFormMessage = !this.incorrectFormMessage;  }

  retrieveWeekDay(obj: any) {
    /*
      Returns the week day inside an object that has this structure:
      {
        {
          <day-of-week>: [ {}, {}, ...]
        },
        {
          <another-day>: [ {}, {}, ...]
        }
      } 
    */
    return Object.keys(obj)[0];
  }
  
  showConfirmDelete(i: number) { this.removeExerciseButtonArray[i] = !this.removeExerciseButtonArray[i]; }
}
