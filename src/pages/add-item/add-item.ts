import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from '../../models/item';
import { User } from '../../models/user';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  private form : FormGroup;
  angularFirebase: AngularFireDatabase;

  user: User;
  
  constructor( 
    public navParams: NavParams,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    afDB: AngularFireDatabase) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
    });

    this.angularFirebase = afDB;

    this.user = this.navParams.get('user');

  }

  saveItem(){
    console.log("Adding new item")
    this.angularFirebase
      .list("users/"+this.user.id+"/items")
      .push(new Item(this.form.value.name, this.form.value.price, this.form.value.date))
      .then( ref => {
        ref.update({id: ref.key })
      }).then( _ => {
        this.navCtrl.pop();
      });
  }
  

}
