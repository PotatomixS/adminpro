import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ConsultasAdminService {

  id:string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
  }

  recogerConsultas( tipo:string ){
    let url = URL_SERVICIOS + '/consulta/administrador/'+tipo+'?token='+localStorage.getItem('token');

    let head = new HttpHeaders().set('Accept', 'application/json');


    return this.http.get ( url )
            .map( (resp:any) => {
              return resp;
            });
  }

}
