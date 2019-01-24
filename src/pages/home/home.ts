import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider, Credenciales } from '../../providers/usuario/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario: Credenciales;

  constructor(
    public navCtrl: NavController,
    public usuarioS: UsuarioProvider,
    private afAuth: AngularFireAuth,
    ) {
      this.usuario = this.usuarioS.usuario;
      this.afAuth.authState.subscribe((user) => {
        console.log('AFAUTH!!!')
        console.log(JSON.stringify(user));
      });

  }

  salir(){
    this.afAuth.auth.signOut().then( res => {
      this.usuarioS.usuario = null;
      this.navCtrl.setRoot('LoginPage');
    });
  }

}
