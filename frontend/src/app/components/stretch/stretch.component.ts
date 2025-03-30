import { Component, inject } from '@angular/core';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { StretchService } from '../../services/stretch/stretch.service';

import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faXmark, faTrash, faPlus, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stretch',
  imports: [NgIf, NgFor, TitleCasePipe, MatTooltipModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './stretch.component.html',
  styleUrl: './stretch.component.css'
})
export class StretchComponent {

  stretchService = inject(StretchService);
  formBuilder = inject(FormBuilder);

  
  stretchData: any;
  dataReady = false;

  newStretchForm = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    value: ['']
  })
  stretchFormState = false;
  stretchTypes = {'T': 'Tempo', 'R': 'Repetição'};
  incorrectFormMsgState = false;

  faPlus = faPlus;
  faXmark = faXmark;
  faPencil = faPencil;
  faTrash = faTrash;

  ngOnInit() {
    this.stretchService.getStretches().subscribe((data: any) => {
      this.stretchData = data;
      this.dataReady = true;
    }) 
  }

  toggleStretchForm() {
    this.stretchFormState = !this.stretchFormState;
  }

  addStretch(stretch: any) {
    this.stretchService.addStretch(stretch).subscribe();
  }

  toggleIncorrectFormMessage() {
    this.incorrectFormMsgState = !this.incorrectFormMsgState;
  }

}
