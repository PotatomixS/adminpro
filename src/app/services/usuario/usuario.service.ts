import { Injectable } from '@angular/core';
import { Paciente } from 'src/app/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  nombre: Paciente;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    this.cargarStorage();
  }

  estaLogueado() {
    return( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.nombre = JSON.parse(localStorage.getItem('nombre'));
    } else {
      this.token='';
      this.nombre=null;
    }
  }

  guardarStorage( tarjeta_sanitaria: string, token: string, nombre: Paciente ) {

    localStorage.setItem('tarjeta_sanitaria',tarjeta_sanitaria);
    localStorage.setItem('token',token);
    localStorage.setItem('nombre', JSON.stringify(nombre));

    this.nombre = nombre;
    this.token = token;
  }

  logout() {
    this.nombre = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('nombre');

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
              console.log(resp);
              this.guardarStorage( resp.paciente.tarjeta_sanitaria,resp.token, resp.paciente.nombre );
              return true;
            });
  }

  crearUsuario( usuario: Paciente ){
     let url = URL_SERVICIOS + '/paciente';

     return this.http.post( url, usuario )
           .map( (resp: any) => {

             swal('Usuario creado', resp.paciente.nombre, 'success')
             return resp.nombre;
           });
  }

}
