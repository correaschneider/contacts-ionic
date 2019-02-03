import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { ContactPage } from '../contact/contact';
import { ConfigurationPage } from '../configuration/configuration';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  contacts: [];
  _contacts: [];
  term: null;

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    private storage: Storage
  ) {
  }

  ionViewWillEnter () {
    this.getContacts();
  }

  search() {
    this.contacts = this._contacts.filter(contact => contact.name.toLowerCase().includes(this.term.toLowerCase()));
  }

  getContacts() {
    this.storage.get('logged').then(logged => {
      let key_contacts = logged + '_contact';
      this.storage.get(key_contacts).then(contacts => {
        this.contacts = contacts;
        this._contacts = contacts;
      });
    });
  }

  goToContact(index){
    this.term = null;

    if (index) {
      this.navCtrl.push(ContactPage, {
        index: index
      });
    } else {
      this.navCtrl.push(ContactPage);
    }
  }

  goToConfiguration(){
    this.term = null;

    this.navCtrl.push(ConfigurationPage);
  }
}
