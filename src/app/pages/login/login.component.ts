import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({
    numberDocument: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      Validators.pattern(/^\d+$/),
    ]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
    type: new FormControl('dni', [Validators.required]),
  });

  animacionIn(Label: string) {
    let label = document.getElementById(Label) as HTMLLabelElement;
    label.classList.add('animate');
    label.style.opacity = '80%';
  }
  animacionOut(Label: string, Input: string) {
    let label = document.getElementById(Label) as HTMLLabelElement;
    let input = document.getElementById(Input) as HTMLInputElement;
    if (input.value == '' || input.value == null) {
      label.classList.toggle('animate');
      label.style.opacity = '50%';
    }
  }
  constructor(private router:Router) {}

  login(){
    this.router.navigate(["/home"])
  }
}
