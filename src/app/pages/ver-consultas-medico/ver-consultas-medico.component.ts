// asd
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConsultasMedicoService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-consultas-medico',
  templateUrl: './ver-consultas-medico.component.html',
  styles: []
})
export class VerConsultasMedicoComponent implements OnInit{
    consultas:any;
    seleccionado:boolean=false;
    itemSeleccionado:any;
    constructor(
        public _ConsultasMedicoService: ConsultasMedicoService,
        private cdr: ChangeDetectorRef,
        private router: Router
    ){

    }
    ngOnInit(){
        this._ConsultasMedicoService.recogerConsultas('Pendiente')
            .subscribe((resp:any) =>
            {
                this.consultas=resp.consultas;
            })
    }

    seleccionar(item:any){
        this.itemSeleccionado=item;
        this.seleccionado=true;
        this.cdr.detectChanges();
    }
    
    volver(){
        this.seleccionado=false;
    }

    actualizarConsulta( forma: NgForm){
        this.itemSeleccionado.diagnostico_medico=forma.value.diagnostico_medico;
        this.itemSeleccionado.estado=forma.value.estado;
         this._ConsultasMedicoService.editarConsulta( this.itemSeleccionado )
               .subscribe(resp=>location.reload());
        this.cdr.detectChanges();
      }
    
    cambiarConsultas(tipo:string){
        this._ConsultasMedicoService.recogerConsultas(tipo)
            .subscribe((resp:any) =>
            {
                this.consultas=resp.consultas;
            })
        this.cdr.detectChanges();
    }
}
