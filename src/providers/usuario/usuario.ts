import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioProvider {

  usuario: Credenciales = {
    nombre: '',
    email: '',
    img: '',
    uid: '',
    provider: ''
  };
  constructor() {
  }

  cargarUsuario(nombre: string, email: string, img: string, uid: string, provider: string){
    this.usuario.nombre = nombre;
    this.usuario.email = email;
    this.usuario.img = img;
    this.usuario.uid = uid;
    this.usuario.provider = provider;
  }

}
export interface Credenciales {
  nombre: string;
  email: string;
  img: string;
  uid: string;
  provider: string;
}