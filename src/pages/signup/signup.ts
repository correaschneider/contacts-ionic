import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ContactsPage } from '../contacts/contacts';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user: {} = {name: null, email: null, password: null, remember_me: false};
  form_error: {} = {name: false, email: false, password: false};

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public toastController: ToastController
  ) {
  }

  createUser(){
    if (this.user.name && this.user.email && this.user.password) {
      let logged = 'user_' + this.user.email.split('@')[0];

      this.storage.get(logged).then(user => {
        if (user) {
          const toast = this.toastController.create({
            message: 'Email already exists',
            position: 'bottom',
            duration: 2000
          });

          this.form_error = {
            name: false,
            email: true,
            password: false
          };

          toast.present();
        } else {
          this.storage.set('logged', logged);
          this.storage.set(logged, this.user);

          this.navCtrl.push(ContactsPage);
        }
      });
    } else {
      if (!this.user.name) {
        const toast = this.toastController.create({
          message: 'Name is required',
          position: 'bottom',
          duration: 2000
        });

        this.form_error = {
          name: true,
          email: false,
          password: false
        };

        toast.present();
      } else if (!this.user.email) {
        const toast = this.toastController.create({
          message: 'Email is required',
          position: 'bottom',
          duration: 2000
        });

        this.form_error = {
          name: false,
          email: true,
          password: false
        };

        toast.present();
      } else if (!this.user.password) {
        const toast = this.toastController.create({
          message: 'Password is required',
          position: 'bottom',
          duration: 2000
        });

        this.form_error = {
          name: false,
          email: false,
          password: true
        };

        toast.present();
      }
    }
  }
}
