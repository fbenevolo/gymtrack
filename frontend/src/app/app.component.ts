import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExercisesComponent } from "./components/exercises/exercises.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExercisesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
