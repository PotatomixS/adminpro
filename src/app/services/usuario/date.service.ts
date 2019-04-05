import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  token: string;
  id: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    this.cargarStorage();
  }

  cargarStorage() {

    if ( localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.id = localStorage.getItem('id');
    } else {
      this.token='';
    }
  }


  pedirHoras( dia: number, mes: number, ano:number, rolMedico: string ){
    let url = URL_SERVICIOS + '/consulta/horasdisponibles/'+this.id+"/"+rolMedico+"/"+ano+"-"+mes+"-"+dia; //id,especialidad,fecha
    //let head = new HttpHeaders().set('Accept', 'application/json');
    // head.append('token', this.token);
    return this.http.get ( url )
            .map( (resp:any) => {
              return resp;
            });
  }

  recogerMedicos(){
    let url = URL_SERVICIOS + '/pacienteMedico/'+this.id; //id,especialidad,fecha
    //let head = new HttpHeaders().set('Accept', 'application/json');
    // head.append('token', this.token);
    return this.http.get ( url )
            .map( (resp:any) => {
              return resp;
            });
  }

  //TODO: hacer consulta
  crearConsulta(fecha:string,id_medico:string, hora:string, especialidad:string){
    let consulta = {
      "id_medico": id_medico,
      "id_paciente": this.id,
      "fecha": fecha+" "+hora,
      "descripcion_paciente": "Descripción del paciente",
      "diagnostico_medico": "Diagnóstico médico",
      "especialidad": especialidad

    };
    let url = URL_SERVICIOS + '/consulta'; //id,especialidad,fecha
    //let head = new HttpHeaders().set('Accept', 'application/json');
    // head.append('token', this.token);
    return this.http.post ( url, consulta )
            .map( (resp:any) => {
              return resp;
            });
  }
}
