import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ContactsPage } from '../contacts/contacts';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contact: {} = {name: null, email: null, phone: null, cel_phone: null};
  form_error: {} = {name: null, email: null, phone: null, cel_phone: null};
  index: null;

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    private storage: Storage,
    public navParams: NavParams
  ) {
    this.index = navParams.get('index');

    if (this.index) {
      this.storage.get('logged').then(logged => {
        let key_contacts = logged + '_contact';
        this.storage.get(key_contacts).then(contacts => {
          // console.log(this.index);
          // console.log(contacts.filter(contact => contact.email = this.index));
          this.contact = contacts[1];
          // this.contact = contacts.filter(contact => contact.email = this.index)[0];
        });
      });
    }
  }

  save(){
    if (this.contact.name && this.contact.email && this.contact.cel_phone) {
      this.storage.get('logged').then(logged => {
        let key_contacts = logged + '_contact';
        this.storage.get(key_contacts).then(_contacts => {
          let contacts = _contacts || [];

          if (this.index) {
            let index;
            contacts.filter((contact, _index) => {
              if (contact.email == this.index) {
                index = _index;
              }
            });
            contacts[index] = this.contact;
          } else {
            let _contacts = contacts.filter(contact => contact.email == this.contact.email);
            if (_contacts.length > 0) {
              this.form_error = {
                name: false,
                email: true,
                cel_phone: false
              };

              const toast = this.toastController.create({
                message: 'This email already exists',
                position: 'bottom',
                duration: 2000
              });

              toast.present();
            } else {
              contacts.push(this.contact);
            }
          }

          contacts.sort((a, b) => {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();

            if (x < y) { return -1; }
            if (x > y) { return 1; }

            return 0;
          });

          this.storage.set(key_contacts, contacts);

          this.form_error = {
            name: false,
            email: false,
            cel_phone: false
          };

          const toast = this.toastController.create({
            message: 'Saved successfully',
            position: 'bottom',
            duration: 2000
          });

          toast.present();
        });
      });
    } else {
      if (!this.contact.name) {
        const toast = this.toastController.create({
          message: 'Name is required',
          position: 'bottom',
          duration: 2000
        });

        this.form_error = {
          name: true,
          email: false,
          cel_phone: false
        };

        toast.present();
      } else if (!this.contact.email) {
        const toast = this.toastController.create({
          message: 'Email is required',
          position: 'bottom',
          duration: 2000
        });

        this.form_error = {
          name: false,
          email: true,
          cel_phone: false
        };

        toast.present();
      } else if (!this.contact.cel_phone) {
        const toast = this.toastController.create({
          message: 'Cel Phone is required',
          position: 'bottom',
          duration: 2000
        });

        this.form_error = {
          name: false,
          email: false,
          cel_phone: true
        };

        toast.present();
      }
    }
  }

  delete(){
    this.storage.get('logged').then(logged => {
      let key_contacts = logged + '_contact';
      this.storage.get(key_contacts).then(_contacts => {
        let contacts = _contacts || [];

        if (typeof this.index == 'number') {
          delete contacts[this.index];
        }

        contacts.sort((a, b) => {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();

          if (x < y) { return -1; }
          if (x > y) { return 1; }

          return 0;
        });

        this.storage.set(key_contacts, contacts);
      });
    });
  }
}
