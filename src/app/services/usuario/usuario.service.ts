import { Injectable } from '@angular/core';
import { Paciente } from 'src/app/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  nombre: string;
  token: string;
  rol: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 
    this.cargarStorage();
  }

  estaLogueado() {
    return( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.nombre = localStorage.getItem('nombre');
    } else {
      this.token='';
      this.nombre=null;
    }
  }

  public guardarStorage( tarjeta_sanitaria: string, token: string, nombre: string, apellido:string, rol: string, id:string, telefono:string, email:string, direccion:string, baja:string, dni:string, admin?:string, nombrem?:string ) {

    localStorage.setItem('tarjeta_sanitaria',tarjeta_sanitaria);
    localStorage.setItem('token',token);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('apellido', apellido);
    localStorage.setItem('rol', rol);
    localStorage.setItem('id', id);
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('email', email);
    localStorage.setItem('direccion', direccion);
    localStorage.setItem('dni', dni);
    localStorage.setItem('baja', baja);
    localStorage.setItem('admin', admin);
    localStorage.setItem('nombrem', nombrem);
    localStorage.setItem("reload","yes");

    this.nombre = nombre;
    this.rol = rol;
    this.token = token;
  }

  logout() {
    this.nombre = null;
    this.token = '';
    this.rol = '';
    
    localStorage.clear()

    this.router.navigate(['/login']);
  }

  login( usuario: any, recuerdame:boolean ){
    if( recuerdame ){
       localStorage.setItem( 'tarjeta_sanitaria', usuario.tarjeta_sanitaria );
     }
     else{
       localStorage.removeItem('tarjeta_sanitaria');
    }
    let url = URL_SERVICIOS + '/login/paciente';

    let head = new HttpHeaders().set('Accept', 'application/json');


    return this.http.post ( url, usuario , {headers:head})
            .map( (resp:any) => {
              this.guardarStorage( resp.paciente.tarjeta_sanitaria,resp.token, resp.paciente.nombre, resp.paciente.apellido, "paciente",resp.paciente._id,resp.paciente.telefono,resp.paciente.email,resp.paciente.direccion,resp.paciente.baja,resp.paciente.dni);
              return true;
            });
  }

  loginm( medico: any, recuerdame:boolean ){
    if( recuerdame ){
       localStorage.setItem( 'usuario', medico.usuario );
     }
     else{
       localStorage.removeItem('usuario');
    }
    let url = URL_SERVICIOS + '/login/medico';

    let head = new HttpHeaders().set('Accept', 'application/json');


    return this.http.post ( url, medico , {headers:head})
            .map( (resp:any) => {
              this.guardarStorage( '',resp.token, resp.medico.usuario, resp.medico.apellido, resp.medico.especialidad,resp.medico._id,resp.medico.telefono,resp.medico.email,resp.medico.direccion,resp.medico.baja,"",resp.medico.rol,resp.medico.nombre);
              return true;
            });
  }

  crearUsuario( usuario: Paciente ){
     let url = URL_SERVICIOS + '/paciente'+'?token='+localStorage.getItem('token');

     return this.http.post( url, usuario )
           .map( (resp: any) => {

             swal('Usuario creado', resp.paciente.nombre, 'success')
             return resp.nombre;
           });
  }

  // cambiarImagen( archivo: File, id: string ){
  //   this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
  //     .then( resp=>{
  //       console.log(resp);
  //     })
  //     .catch( resp=>{
  //       console.log(resp);
  //     });
  // }

}
