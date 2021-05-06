import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  crearUsuario(nombre: string, email: string, password: string): Promise<any> {

    return this.auth.createUserWithEmailAndPassword(email, password);

  }

  loginUsuario(correo: string, password: string): Promise<any> {

    return this.auth.signInWithEmailAndPassword(correo, password);

  }

}
