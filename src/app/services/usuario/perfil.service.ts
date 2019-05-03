import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  id:string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    this.cargarStorage();
  }

  cargarStorage() {

    if ( localStorage.getItem('token')){
      this.id = localStorage.getItem('id');
    } else {
      this.id='';
    }
  }

  actualizarPaciente( paciente:any ){
    let url = URL_SERVICIOS + '/paciente/'+this.id+'?token='+localStorage.getItem('token');
    let head = new HttpHeaders().set('Accept', 'application/json');
    return this.http.put ( url, paciente, {headers:head} )
            .map( (resp:any) => {
            });
  }

  actualizarMedico( medico:any ){
    let url = URL_SERVICIOS + '/medico/'+this.id+'?token='+localStorage.getItem('token');
    let head = new HttpHeaders().set('Accept', 'application/json');
    return this.http.put ( url, medico, {headers:head} )
            .map( (resp:any) => {
            });
  }
}
