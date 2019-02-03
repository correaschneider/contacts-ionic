import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ContactsPage } from '../contacts/contacts';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {

  user: {} = {name: null, email: null, password: null};
  form_error: {} = {name: null, email: null, password: null};

  constructor(public navCtrl: NavController, private storage: Storage, public toastController: ToastController) {
    this.storage.get('logged').then(logged => {
      this.storage.get(logged).then(user => {
        this.user = user;
      });
    });
  }

  save(){
    if (this.user.name && this.user.email && this.user.password) {
      this.storage.get('logged').then(logged => {
        this.storage.set(logged, this.user);
      });

      const toast = this.toastController.create({
          message: 'Saved successfully',
          position: 'bottom',
          duration: 2000
        });

        toast.present();
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

  logout(){
    this.storage.remove('logged');

    this.navCtrl.goToRoot(LoginPage);
  }

  delete(){
    this.storage.get('logged').then(logged => {
      this.storage.remove(logged);

      this.logout();
    });
  }
}
