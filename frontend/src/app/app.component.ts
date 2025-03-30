import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ExercisesComponent } from "./components/exercises/exercises.component";
import { ChartsComponent } from './components/charts/charts.component';
import { StretchComponent } from './components/stretch/stretch.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExercisesComponent, ChartsComponent, StretchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
