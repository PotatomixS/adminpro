export class Paciente{

    constructor (
        public nombre: string,
        public apellido: string,
        public usuario: string,
        public password: string,
        public email: string,
        public telefono: string,
        public baja: boolean,
        public especialidad: string
     )
     {}
}
