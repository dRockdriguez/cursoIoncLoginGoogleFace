import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public usuarioS: UsuarioProvider,
    public platform: Platform,
    public fb: Facebook,
    private googlePlus: GooglePlus
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginFacebook(){
    if (this.platform.is('cordova')){
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential).then((user) => {
          this.usuarioS.cargarUsuario(user.displayName, user.email, user.photoURL, user.uid, 'facebook');
          this.navCtrl.setRoot(HomePage);
        }).catch(e => console.log('Error con el login'));
      })
    } else {
      this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        let user = res.user;
        this.usuarioS.cargarUsuario(user.displayName, user.email, user.photoURL, user.uid, 'facebook');

        this.navCtrl.setRoot(HomePage);
      });
    }
  }

  loginGoogle(){
    this.googlePlus.login({
      'webClientId': '681410039758-a113i16i2g81mgoh1uu83cm60jjuk7ht.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then( user => {
        this.usuarioS.cargarUsuario(user.displayName, user.email, user.photoURL, user.uid, 'facebook');
        console.log("Firebase success: " + JSON.stringify(user));
        this.navCtrl.setRoot(HomePage);
      })
    })
      .catch(err => console.error(err));
  }
}
