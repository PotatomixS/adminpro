import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      "tarjeta_sanitaria": forma.value.tarjeta_sanitaria,
      "password": forma.value.password
    };

     this._usuarioService.login( usuario, forma.value.recuerdame)
           .subscribe( correcto => {
             this.router.navigate(['/dashboard']);
            }, error => {  
              swal('Error','El usuario y/o la contraseña no son correctos','error');  
            }
             );

    //this.router.navigate(['/dashboard']);
  }
}
