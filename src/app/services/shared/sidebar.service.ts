import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {
  menu: any = [];
  constructor() {
    if(localStorage.getItem("rol")=="paciente")
    this.menu = [
      {
        titulo: 'Principal',
        icono: 'mdi mdi-gauge',
        submenu: [
          { titulo: 'Calendario',url: '/dashboard'},
          { titulo: 'Ver consultas',url: '/verconsultasp'}
        ]
      }
    ];
    else if(localStorage.getItem("admin"))
    this.menu = [
      {
        titulo: 'Principal',
        icono: 'mdi mdi-gauge',
        submenu: [
          { titulo: 'Crear paciente',url: '/crearPaciente'},
          { titulo: 'Crear medico',url: '/crearMedico'},
          //TODO: BRF Eliminar consulta opcional
          { titulo: 'Eliminar consulta',url: '/eliminarconsulta'}
        ]
      }
    ];
    else
    this.menu = [
      {
        titulo: 'Principal',
        icono: 'mdi mdi-gauge',
        submenu: [
          { titulo: 'Consultas pendientes',url: '/verconsultasm'}
        ]
      }
    ];
   }
}
