
export class Paciente{

    constructor ( 
        public nombre: string,
        public apellido: string,
        public password: string,
        public dni: string,
        public email: string,
        public telefono: string,
        public direccion: string,
        public tarjeta_sanitaria: string,
        public _id?: string
     ){

    }

}