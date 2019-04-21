import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { jqxCalendarComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';
import { DateService, ConsultasPacienteService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import swal from "sweetalert";
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
  horas:string[]=[];
  horasOcupadas:string[];

  medicos:any[]=[
  ];

  habilitadas:boolean[]=[true,true,true,true];

  constructor(
    public router: Router,
    public _dateService: DateService,
    public _ConsultasPacienteService: ConsultasPacienteService,
    private cdr: ChangeDetectorRef,
  ){
  }
  myCalendarEvent(event: any): void {
    if(this.medicoSeleccionado!="Ninguno"){
      let date = event.args.date;
      let horasOcupadas;
      let horAux = [
        "07:00","07:20","07:40",
        "08:00","08:20","08:40",
        "09:00","09:20","09:40",
        "10:00","10:20","10:40",
        "11:00","11:20","11:40",
        "12:00","12:20","12:40"
        ]
      this.fechaSeleccionada=date.getFullYear() +"/"+ (date.getMonth()+1) +"/"+ date.getDate();
      this._dateService.pedirHoras(date.getDate(), (date.getMonth()+1), date.getFullYear(), this.medicoSeleccionado)
        .subscribe((resp:any) =>
          {
            horasOcupadas=resp.fechasOcupadas;
            let horas=[];
            if(horasOcupadas[0])
            {
              let count=0;
              for(let i=0;i<horAux.length;i++){
                let str = horasOcupadas[count];
                let siguiente = str.substr((str.indexOf('T')+1),5);

                if(horAux[i]===siguiente)
                {count++;}
                else
                {horas.push(horAux[i]);}

                if(!(horasOcupadas[count])){count--;}
              }
            }
            else{horas=horAux;}
            this.setHora(horas)
          }
        );
      //this.router.navigate(['/dashboard']); 
    }else{
      this.setHora([]);
    }
  }

  setHora(horas:any){
    this.horas=horas;
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.medicoSeleccionado="Ninguno";
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
    this._ConsultasPacienteService.recogerConsultas()
        .subscribe( (resp:any) => 
          {
            let existe = false;
            for(let i=0;i<resp.consultas.length;i++){
              if(resp.consultas[i].especialidad===this.medicoSeleccionado)
              {
                existe=true;
              }
            }
            if(!existe){
              if (confirm("¿Quieres coger "+evt+" como hora de la consulta?")) {
                let comentario_paciente = prompt("Por favor diga brevemente el motivo de su consulta:");
                this.horaSeleccionada=evt;
                this._dateService.crearConsulta(this.fechaSeleccionada,this.medicos[0].id, this.horaSeleccionada, this.medicos[0].especialidad,comentario_paciente)
                .subscribe();
                swal("Consulta", "Consulta realizada correctamente", "success");
              }
            }
            else
            swal("Consulta", "Ya existe una consulta con este médico", "error");
          }
        );
  }

  cambiarMedico(medico:string="Ninguno"){
    this.medicoSeleccionado=medico;
    this.setHora([]);
    this.myCalendar.clear();

  }
}
