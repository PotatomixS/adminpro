import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-loginm',
  templateUrl: './loginm.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginmComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1){
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm){
    if ( forma.invalid ){
      return;
    }

    let usuario = {
      usuario: forma.value.usuario,
      password: forma.value.password
    };

     this._usuarioService.loginm( usuario, forma.value.recuerdame)
           .subscribe( correcto => this.router.navigate(['/dashboard']));

    //this.router.navigate(['/dashboard']);
  }
}
