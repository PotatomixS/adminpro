import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrearUsuarioService } from 'src/app/services/service.index';
@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styleUrls: []
})
export class CrearMedicoComponent implements OnInit {

  especialidades:any;
  constructor(
    private _crearUsuarioService:CrearUsuarioService
  ) { }

  ngOnInit() {
    this._crearUsuarioService.recogerEspecialidades().subscribe(resp => {
      this.especialidades=resp.medicos});
  }

  ingresar( forma: NgForm){
    if ( forma.invalid ){
      return;
    }
    let usuario = {
      "nombre": forma.value.nombre,
      "apellido": forma.value.apellido,
      "usuario": forma.value.usuario,
      "password": forma.value.password,
      "email": forma.value.email,
      "telefono": forma.value.telefono,
      "especialidad": forma.value.especialidad,
      "rol": forma.value.rol
    };
     this._crearUsuarioService.crearMedico( usuario )
           .subscribe();

    //this.router.navigate(['/dashboard']);
  }

}
