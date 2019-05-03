import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PerfilService, UsuarioService, SubirArchivoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  esPaciente:boolean;
  usuario:any
  tarjeta_sanitaria: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
  rol: string;
  dni: string;
  password: any;
  img: string;
  
  imagenSubir: File;
  imagenUrl: string;

  constructor(
    private _subirArchivoService: SubirArchivoService,
    private _usuarioService: UsuarioService,
    private _perfilService: PerfilService,
    private cdr : ChangeDetectorRef
  ) {
   }

  ngOnInit() {
    this.apellido=localStorage.getItem("apellido");
    this.correo=localStorage.getItem("email");
    this.telefono=localStorage.getItem("telefono");
    this.img=localStorage.getItem("img");
    if(localStorage.getItem("rol")==="paciente")
    {
      this.esPaciente=true;
      this.tarjeta_sanitaria=localStorage.getItem("tarjeta_sanitaria");
      this.nombre=localStorage.getItem("nombre");
      this.direccion=localStorage.getItem("direccion");
      this.dni=localStorage.getItem("dni");
    }
    else
    {
      this.esPaciente=false;
      this.usuario=localStorage.getItem("nombre");
      this.nombre=localStorage.getItem("nombrem");
      this.rol=localStorage.getItem("rol");
    }
  }

  ingresar( forma: NgForm){
    if(forma.value.password === forma.value.cpassword)
    {
      let pass=forma.value.password;
      if(!forma.value.password){
        pass=' ';
      }
      if(this.esPaciente)
      {
        //this._usuarioService.cambiarImagen( this.imagenSubir, localStorage.getItem("id"));

        let usuario = {
          "nombre": this.nombre,
          "apellido": this.apellido,
          "password": pass,
          "dni": this.dni,
          "email": forma.value.correo,
          "telefono": forma.value.telefono,
          "direccion": forma.value.direccion,
          "tarjeta_sanitaria": this.tarjeta_sanitaria,
          "baja": "false",
          "img": "uploads/pacientes/"+this.imagenUrl
        };
        this._usuarioService.guardarStorage( usuario.tarjeta_sanitaria, localStorage.getItem("token"), usuario.nombre, usuario.apellido, "paciente", localStorage.getItem("id"), usuario.telefono, usuario.email, usuario.direccion, usuario.baja, usuario.dni, usuario.img );
        this._subirArchivoService.subirArchivo( this.imagenSubir, "paciente", localStorage.getItem("id"), usuario);
        // this._perfilService.actualizarPaciente( usuario )
        //       .subscribe();

      }
      else
      {
        let usuario = {
          "usuario": forma.value.usuario,
          "nombre": this.nombre,
          "apellido": this.apellido,
          "rol": "Médico",
          "password": pass,
          "email": forma.value.correo,
          "telefono": forma.value.telefono,
          "especialidad": this.rol,
          "baja": "false",
          "img": "uploads/medicos/"+this.imagenUrl
          
        };
        this._usuarioService.guardarStorage( '', localStorage.getItem("token"), usuario.usuario, usuario.apellido, usuario.especialidad, localStorage.getItem("id"), usuario.telefono, usuario.email, "", usuario.baja, "", usuario.img, usuario.rol, usuario.nombre );
        this._subirArchivoService.subirArchivo( this.imagenSubir, "medico", localStorage.getItem("id"), usuario);
      }
    }
    //this.router.navigate(['/dashboard']); 
  }

  seleccionImage( archivo: File ) {
    if ( !archivo ){
      this.imagenSubir=null;
      return;
    }

    this.imagenSubir = archivo;
    this.imagenUrl = archivo.name;
  }

  darDeBaja(){
    if (confirm("¿Está seguro de que quiere darse de baja?")) {
      this._usuarioService.baja("medico",localStorage.getItem("id"));
    }
  }
}
