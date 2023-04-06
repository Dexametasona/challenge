import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Chart from 'chart.js/auto';
import { UserTransaccionI } from 'src/interface/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit,OnDestroy {
  constructor(private data: DataService) {}
  transaccion!: UserTransaccionI[];
  deudas!: any[];
  balance!: any[];
  ingresoMensual!: any[];
  egresoMensual!: any[];
  tarjeta!: any[];
  public chartIngreso: any;
  public chartEgreso: any;
  public chartBar: any;
  ingresoMensualTotal = 0;
  egresoMensualTotal = 0;
  suscripcion!:Subscription;

  ngOnInit(): void {
    this.suscripcion=this.data.getUserData(this.data.usuario[0]).subscribe((res) => {
      this.tarjeta = res.filter((user) => user['tipo'] == 'tarjeta');
      this.transaccion = res.filter(
        (user) => user['tipo'] == 'transaccion'
      ) as UserTransaccionI[];
      this.deudas = res.filter((user) => user['tipo'] == 'deuda');
      this.balance = res.filter((user) => user['tipo'] == 'balanceSemanal');
      this.egresoMensual = res.filter(
        (user) => user['tipo'] == 'egreso mensual'
      );
      this.ingresoMensual = res.filter(
        (user) => user['tipo'] == 'ingreso mensual'
      );
      this.ingresoChart();
      this.egresoChart();
      this.chartBalance();
      console.log(this.transaccion);
    });
  }

  ingresoChart() {
    let data = [
      this.ingresoMensual[0].de1a5dias,
      this.ingresoMensual[0].de6a10dias,
      this.ingresoMensual[0].de11a15dias,
      this.ingresoMensual[0].de16a20dias,
      this.ingresoMensual[0].de21a25dias,
      this.ingresoMensual[0].de26a31dias,
    ];
    for (let i of data) {
      this.ingresoMensualTotal += i;
    }
    this.chartIngreso = new Chart('chartIngreso', {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', ''],
        datasets: [
          {
            label: 'ingresos mensuales',
            data: data,
            fill: true,
            borderColor: 'rgb(255, 255, 255)',
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  egresoChart() {
    let data = [
      this.egresoMensual[0].de1a5dias,
      this.egresoMensual[0].de6a10dias,
      this.egresoMensual[0].de11a15dias,
      this.egresoMensual[0].de16a20dias,
      this.egresoMensual[0].de21a25dias,
      this.egresoMensual[0].de26a31dias,
    ];
    for (let i of data) {
      this.egresoMensualTotal += i;
    }

    this.chartEgreso = new Chart('chartEgreso', {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', ''],
        datasets: [
          {
            data: data,
            fill: true,
            borderColor: 'rgb(255, 255, 255)',
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  chartBalance() {
    const dataActual = [
      this.balance[0].lunes,
      this.balance[0].martes,
      this.balance[0].miercoles,
      this.balance[0].jueves,
      this.balance[0].viernes,
      this.balance[0].sabado,
      this.balance[0].domingo,
    ];

    const dataPast = [
      this.balance[0].lunAnterior,
      this.balance[0].marAnterior,
      this.balance[0].mierAnterior,
      this.balance[0].jueAnterior,
      this.balance[0].vieAnterior,
      this.balance[0].sabAnterior,
      this.balance[0].domAnterior,
    ];

    this.chartBar = new Chart('chartBar', {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [
          {
            label: 'Semana actual',
            data: dataActual,
            borderColor: 'rgb(255,255,255)',
            backgroundColor: 'rgb(200,200,200)',
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
          },
          {
            label: 'Semana Pasada',
            data: dataPast,
            borderColor: 'rgb(0,255,255)',
            backgroundColor: 'rgb(0,200,200)',
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        plugins: {
          legend: {
            display: true,
            labels: {
              pointStyle: 'circle',
              usePointStyle: true,
            },
            align: 'end',
            title: {
              font: {
                size: 8,
              },
            },
          },
          title: {
            display: true,
            text: 'Balance Semanal',
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
  ngOnDestroy(): void {
      this.suscripcion.unsubscribe();
  }
}
