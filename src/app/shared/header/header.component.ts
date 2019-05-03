import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  imagen:string;
  constructor( public _usuarioService: UsuarioService) { 
    this.imagen= URL_SERVICIOS+"/"+localStorage.getItem("img");
  }

  ngOnInit() {
  }

}
