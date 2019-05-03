import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ConsultasAdminService } from '../../services/service.index'
@Component({
  selector: 'app-ver-consultas-admin',
  templateUrl: './ver-consultas-admin.component.html',
  styles: []
})
export class VerConsultasAdminComponent implements OnInit{
    consultas:any;
    constructor(
        public _ConsultasAdminService: ConsultasAdminService,
        private cdr: ChangeDetectorRef
    ){

    }
    ngOnInit(){
        this._ConsultasAdminService.recogerConsultas('Pendiente')
            .subscribe((resp:any) =>
            {
                this.consultas=resp.consultas;
                console.log(this.consultas);
            })
    }
    cambiarConsultas(tipo:string){
        this._ConsultasAdminService.recogerConsultas(tipo)
            .subscribe((resp:any) =>
            {
                this.consultas=resp.consultas;
            })
        this.cdr.detectChanges();
    }
}
