import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string, datos:any ){

    return new Promise( (resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'nombre', datos.nombre);
      formData.append( 'apellido', datos.apellido);
      formData.append( 'password', datos.password);
      formData.append( 'email', datos.email);
      formData.append( 'telefono', datos.telefono);
      formData.append( 'baja', datos.baja);

      if(tipo==="paciente"){
      formData.append( 'dni', datos.dni);
      formData.append( 'direccion', datos.direccion);
      formData.append( 'tarjeta_sanitaria', datos.tarjeta_sanitaria);
      }
      else{
      formData.append( 'usuario', datos.usuario);
      formData.append( 'rol', datos.rol);
      formData.append( 'especialidad', datos.especialidad);
      }
      if(archivo)
       formData.append( 'imagen', archivo, archivo.name );
  
      xhr.onreadystatechange = function() {
        if( xhr.readyState === 4 ) {
          if( xhr.status === 200 ) {
            swal('Listo', 'Datos editados correctamente', 'success');
            resolve( JSON.parse( xhr.response ) );
          } else {
            swal('Error', 'Los datos no pudieron editarse', 'error');
            reject( xhr.response );
          }
        }
      };

      let url = URL_SERVICIOS + '/'+tipo+'/'+localStorage.getItem('id')+'?token='+localStorage.getItem('token');

      xhr.open('PUT', url, true);
      xhr.send( formData );
    });


  }

}
