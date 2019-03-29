import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../../services/service.index';
import { Paciente } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales( campo1:string, campo2:string ){
    return ( group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if ( pass1===pass2 ){
        return null;
      }
      else{
        return{
          sonIguales:true
        };
      }
    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2' ) });
    
    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '1234',
      password2: '1234',
      condiciones: true
    })
 
  }


  registrarUsuario() {

    if( this.forma.invalid ){
      return;
    }

    if ( !this.forma.value.condiciones ){
      swal( 'Importante','Debe de aceptar las condiciones','warning' );
      return;
    }

    let usuario = new Paciente(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.password,
      this.forma.value.dni,
      this.forma.value.email,
      this.forma.value.telefono,
      this.forma.value.direccion,
      this.forma.value.tarjeta_sanitaria
    );

    // this._usuarioService.crearUsuario( usuario )
    //   .subscribe( resp => this.router.navigate(['/login']));
  }
}
