import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsuarioProvider } from '../providers/usuario/usuario';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
export const firebaseConfig = {
  apiKey: "AIzaSyBET-8Axdg9lmzYUbs7ACu5I67bGHrUBfQ",
  authDomain: "proyectologinapp.firebaseapp.com",
  databaseURL: "https://proyectologinapp.firebaseio.com",
  projectId: "proyectologinapp",
  storageBucket: "",
  messagingSenderId: "681410039758"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UsuarioProvider,
    Facebook,
    GooglePlus
  ]
})
export class AppModule { }
