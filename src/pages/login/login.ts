import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { FormGroup } from '@angular/forms/src/model';

import { TabsPage } from '../tabs/tabs';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../models/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  input: User;
  users: User[];

  angularFirebase: AngularFireDatabase;
  object: AngularFireObject<User>;
  subscription: Subscription;

  constructor( 
    public navParams: NavParams,
    public navCtrl: NavController,
    afDB: AngularFireDatabase ) {

      this.input = new User("","");
      this.angularFirebase = afDB;

      // this.users = afDB.list("users/").valueChanges();
      this.subscription = afDB.list("users/").valueChanges().subscribe(data => {
        this.users = <[User]> data;
      });

  }

  doLogin() {
    console.log('Login -------');
    // console.log(JSON.stringify(this.input));

    this.users.forEach(userResult => {

      if(userResult.username == this.input.username) {
        // console.log('> Found user');
        if (userResult.password == this.input.password) {
          // console.log('> Authenticated');

          // Unsubscribe users list changes
          this.subscription.unsubscribe();

          // Go to app
          this.navCtrl.setRoot(TabsPage, { data: userResult });
        }
      }
      
    });

  }

}
