import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  
  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router
    ) {}

  canActivate(){
    if( this._usuarioService.estaLogueado() ){
      console.log( 'Ha pasado el guard ');
    } else {
      console.log( 'Bloqueado por el guard' );
      this.router.navigate(['/login']);
      return false;
    }
    console.log( 'Ha pasado por el login guard' );
    return true;
  }
}
