import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { URL_SERVICIOS } from "../../config/config"
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  imagen:string;
  constructor( 
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
    ) { 
      this.imagen= URL_SERVICIOS+"/"+localStorage.getItem("img");
    }

  ngOnInit() {
  }

}
