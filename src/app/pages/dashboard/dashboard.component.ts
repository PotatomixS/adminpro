import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { jqxCalendarComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';
import { DateService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import swal from "sweetalert";

declare function init_plugins();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit,AfterViewInit {
  @ViewChild('myCalendar') myCalendar: jqxCalendarComponent;
  tipoUsuario:string = localStorage.getItem("rol");
  medicoSeleccionado:string;
  fechaSeleccionada:string;
  horaSeleccionada:string;
  horas:string[]=[
  "7:00","7:20","7:40",
  "8:00","8:20","8:40",
  "9:00","9:20","9:40",
  "10:00","10:20","10:40",
  "11:00","11:20","11:40",
  "12:00","12:20","12:40"
  ];
  horasOcupadas:string[];

  medicos:any[]=[
  ];

  habilitadas:boolean[]=[true,true,true,true];

  constructor(
    public router: Router,
    public _dateService: DateService,
  ){
  }
  myCalendarEvent(event: any): void {
      let date = event.args.date;
      this.fechaSeleccionada=date.getFullYear() +"/"+ (date.getMonth()+1) +"/"+ date.getDate();
      this._dateService.pedirHoras(date.getDate(), (date.getMonth()+1), date.getFullYear(), this.medicoSeleccionado)
        .subscribe((resp:any) => console.log(resp));
      //this.router.navigate(['/dashboard']);

  }

  ngOnInit() {
    init_plugins();
    this.cambiarMedico("Cabecera");
    this.fechaSeleccionada="";
  }

  ngAfterViewInit(){
    this._dateService.recogerMedicos()
    .subscribe((resp:any) => {
      for(let i=0;i<resp.pacienteMedicos.length;i++){
        this.medicos.push({
          "id":resp.pacienteMedicos[i].id_medico._id,
          "nombre":resp.pacienteMedicos[i].id_medico.nombre,
          "apellido":resp.pacienteMedicos[i].id_medico.apellido,
          "especialidad":resp.pacienteMedicos[i].id_medico.especialidad
        });
      }
    });
  }

  seleccionarHora( evt:any ){
    if (confirm("¿Quieres coger "+evt+" como hora de la consulta?")) {
      this.horaSeleccionada=evt;
    this._dateService.crearConsulta(this.fechaSeleccionada,this.medicos[0].id, this.horaSeleccionada, this.medicos[0].especialidad)
    .subscribe();
    swal("Consulta", "Consulta realizada correctamente", "success");
    }
  }

  cambiarMedico(evt:any){
    this.medicoSeleccionado=evt;

  }
}
