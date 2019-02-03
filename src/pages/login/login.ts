import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ContactsPage } from '../contacts/contacts';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: null;
  password: null;
  remember_me: false;

  form_error: {} = {login: false, password: false};

  constructor(public navCtrl: NavController, private storage: Storage, public toastController: ToastController) {
    this.storage.forEach((user, key) => {
      if (user.remember_me) {
        this.login = user.email;
        this.password = user.password;
        this.remember_me = user.remember_me;
      }
    });
  }

  doLogin(){
    if (this.login && this.password) {
      let login = this.login;
      let password = this.password;
      let logged = 'user_' + login.split('@')[0];
      this.storage.get(logged).then((user) => {
          if (user && user.password == password) {
            this.storage.set('logged', logged);
            if (this.remember_me) {
              this.storage.set('remember_me', true);
            } else {
              this.storage.set('remember_me', false);
            }

            this.form_error = {
              login: false,
              password: false,
            };

            this.navCtrl.push(ContactsPage);
          } else {
            const toast = this.toastController.create({
              message: 'Login or Password invalid',
              position: 'bottom',
              duration: 2000
            });

            this.form_error = {
              login: true,
              password: true,
            };

            toast.present();
          }
      });
    } else {
      if (!this.login) {
        const toast = this.toastController.create({
          message: 'Login is required',
          position: 'bottom',
          duration: 2000
        });

        this.form_error = {
          login: true,
          password: false,
        };

        toast.present();
      } else if (!this.password) {
        const toast = this.toastController.create({
          message: 'Password is required',
          position: 'bottom',
          duration: 2000
        });

        this.form_error = {
          login: false,
          password: true,
        };

        toast.present();
      }
    }
  }

  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
}
