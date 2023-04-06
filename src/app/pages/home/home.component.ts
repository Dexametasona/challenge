import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  suscripcion!: Subscription;
  constructor(private data: DataService, private router: Router) {}
  rutas!: any[];

  @ViewChild('navBar') navBar!: ElementRef;
  buttonVisible = true;

  ngOnInit(): void {
    this.suscripcion = this.data
      .getUserData(this.data.usuario[0])
      .subscribe((res) => {
        this.rutas = res.filter((user) => user['tipo'] == 'rutas');
      });
  }

  moveNavBar() {
    this.navBar.nativeElement.classList.toggle('slide');
    this.buttonVisible = !this.buttonVisible;
  }

  logout() {
    Swal.fire({
      icon: 'question',
      title: 'Cerrar sesión',
      text: 'Esta seguro que desea cerrar sesión?',
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
        this.data.usuario = [{ dni: '', pass: '', nombre: '' }];
      }
    });
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
}
