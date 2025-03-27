import { Component, inject } from '@angular/core';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ExercisesService } from '../../services/exercises.service';

import Chart from 'chart.js/auto';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-charts',
  imports: [NgIf, NgFor, TitleCasePipe, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
  chart: Chart | undefined;

  faChevronDown = faChevronDown;
  faCheck = faCheck;

  exerciseService = inject(ExercisesService);
  formBuilder = inject(FormBuilder);

  exercisesList: Array<any> = [];
  periodList: Array<string> = ['1 mês', '3 meses', '6 meses', '1 ano', 'Máximo'];
  progressionTypes: Array<string> = ['Peso', 'Repetição'];

  exerciseListActive = false;
  periodListActive = false;

  selectExerciseEvolutionForm = this.formBuilder.group({
    exercise: ['', Validators.required],
    period: ['', Validators.required],
    progressionType: ['', Validators.required]
  });

  ngOnInit() {

    // IDEIA INTERESSANTE
    // FAZER ESQUEMA PARA SELECIONAR EXERCICIO ALEATORIO E FAZER GRÁFICO DELE AO INICIAR A APLICAÇÃO

    this.exerciseService.getExercises().subscribe((data: any) => {
      this.exercisesList = data;
    })
  }


  showExerciseList() { this.exerciseListActive = !this.exerciseListActive; }
  showPeriodList() { this.periodListActive = !this.periodListActive; }

  generateChart(options: any) {

    let e = this.exercisesList.filter((e: any) => e.exercise.name == options.exercise)[0];
    let weightProgression = e.exercise.weightProgression;
    let dataLabels = weightProgression.map((w: any) => w.date);
    
    let data = weightProgression.map((w: any) => w.weight);
    if (options.progressionType == 'repeticao') {
      data = weightProgression.map((w: any) => w.reps);
    }

    if (this.chart) { this.chart.destroy(); }
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: dataLabels,
        datasets: [
          {
            label: 'Progresso',
            data: data,
            borderWidth: 1,
          },
        ],
      }
    });
    
  }

}
