import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ConsultasMedicoService {

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

  recogerConsultas( ){
    let url = URL_SERVICIOS + '/consulta/medico/'+this.id+'/'+localStorage.getItem('rol')+'/Pendiente'+'?token='+localStorage.getItem('token');

    let head = new HttpHeaders().set('Accept', 'application/json');


    return this.http.get ( url )
            .map( (resp:any) => {
              return resp;
            });
  }

  //TODO: No va el put para medicos
  editarConsulta( consulta:any ){
    let url = URL_SERVICIOS + '/consulta/'+consulta._id+'/?token='+localStorage.getItem('token');

    let head = new HttpHeaders().set('Accept', 'application/json');
    return this.http.put ( url, consulta, {headers:head} )
            .map( (resp:any) => {
              return resp;
            });
  }

}
