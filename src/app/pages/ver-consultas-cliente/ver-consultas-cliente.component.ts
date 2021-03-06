import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ConsultasPacienteService } from 'src/app/services/service.index';

@Component({
  selector: 'app-ver-consultas-cliente',
  templateUrl: './ver-consultas-cliente.component.html',
  styles: []
})
export class VerConsultasClienteComponent implements OnInit{
    consultas:any;
    constructor(
        public _ConsultasPacienteService: ConsultasPacienteService,
        private cdr: ChangeDetectorRef
    ){

    }
    ngOnInit(){
        this._ConsultasPacienteService.recogerConsultas('Pendiente')
            .subscribe((resp:any) =>
            {
                this.consultas=resp.consultas;
                console.log(this.consultas);
            })
    }
    cambiarConsultas(tipo:string){
        this._ConsultasPacienteService.recogerConsultas(tipo)
            .subscribe((resp:any) =>
            {
                this.consultas=resp.consultas;
            })
        this.cdr.detectChanges();
    }
}
