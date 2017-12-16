import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { EditItemPage } from '../edit-item/edit-item';
import { Item } from '../../models/item';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  items: Observable<any[]>;
  user: User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    afDB: AngularFireDatabase) {

      console.log("home navParams: "+JSON.stringify(this.navParams));

      this.user = this.navParams.data;
      this.items = afDB.list("users/"+this.user.id+"/items").valueChanges();
  }

  addItem() {
    console.log("Pushing to Add Item");
    this.navCtrl.push(AddItemPage, {
      user: this.user
    });
  }

  editItem(item) {
    this.navCtrl.push(EditItemPage, {
      user: this.user,
      data: item
    });
  }

}
