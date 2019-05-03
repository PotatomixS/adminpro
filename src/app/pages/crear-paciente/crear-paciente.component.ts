import { Component, OnInit } from '@angular/core';
import { CrearUsuarioService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: []
})
export class CrearPacienteComponent implements OnInit {

  especialidades:any;
  constructor(
    private _crearUsuarioService:CrearUsuarioService
  ) { }

  ngOnInit() {
  }

  ingresar( forma: NgForm){
    if ( forma.invalid ){
      return;
    }
    let usuario = {
      "nombre": forma.value.nombre,
      "apellido": forma.value.apellido,
      "password": forma.value.password,
      "dni": forma.value.dni,
      "email": forma.value.email,
      "telefono": forma.value.telefono,
      "direccion": forma.value.direccion
    };
     this._crearUsuarioService.crearPaciente( usuario )
           .subscribe();

    //this.router.navigate(['/dashboard']);
  }
}
