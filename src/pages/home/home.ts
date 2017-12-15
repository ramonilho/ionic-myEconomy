import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { EditItemPage } from '../edit-item/edit-item';
import { Item } from '../../models/item';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  items: Observable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    afDB: AngularFireDatabase) {
      this.items = afDB.list("users/"+0+"/items").valueChanges();
  }

  addItem() {
    this.navCtrl.push(AddItemPage);
  }

  editItem(item) {
    this.navCtrl.push(EditItemPage, {data: item});
  }

}
