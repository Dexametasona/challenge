import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { UserInterface } from 'src/interface/UserInterface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({
    dni: new FormControl('', [
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
  constructor(private router: Router, private loginService:LoginService, private data:DataService) {}

  login() {
    const formulario=this.form.value as UserInterface
    this.loginService.getUsers().subscribe(res=>{
      this.data.usuario=res.filter(user=>user.pass==formulario.pass && user.dni==formulario.dni)
      if(this.data.usuario[0]!=undefined){
        this.router.navigate(['/home']);
      }
      else{
        Swal.fire({
          icon:'error',
          title:"Error!!!",
          text:"Usuario o contraseña incorrecta",
          confirmButtonColor:"OK"
        })
      }
    })

  }
}
