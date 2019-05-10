import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dar-baja-paciente',
  templateUrl: './dar-baja-paciente.component.html',
  styles: []
})
export class DarBajaPacienteComponent implements OnInit {

  constructor(
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }
  
  darDeBaja( forma: NgForm){
    if (confirm("¿Está seguro de que quiere dar este usuario de baja?")) {
      this._usuarioService.baja("paciente",forma.value.dni).subscribe();
    }
  }
}
