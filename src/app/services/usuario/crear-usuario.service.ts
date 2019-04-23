import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
//
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class CrearUsuarioService {

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
  }


  crearMedico( usuario: any ){
    let head = new HttpHeaders().set('Accept', 'application/json');
    
    let url = URL_SERVICIOS + '/medico'+'?token='+localStorage.getItem('token');

      return this.http.post( url, usuario, {headers:head} )
            .map( (resp: any) => {

              swal('Medico creado', usuario.usuario , 'success')
              return true;
            });
  }

  crearPaciente( usuario: any ){
    let head = new HttpHeaders().set('Accept', 'application/json');
    
    let url = URL_SERVICIOS + '/paciente'+'?token='+localStorage.getItem('token');

      return this.http.post( url, usuario, {headers:head} )
            .map( (resp: any) => {
              swal('Paciente creado', "usuario: " + usuario.nombre + "\ntarjeta sanitaria: " + resp.paciente.tarjeta_sanitaria, 'success')
              return true;
            });
  }

  recogerEspecialidades(){
    let url = URL_SERVICIOS +  '/medico/especialidades'+'?token='+localStorage.getItem('token');
    return this.http.get( url )
           .map( (resp: any) => {
             return resp;
           });
  }
}
