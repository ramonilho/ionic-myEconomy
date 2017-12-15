import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from '../../models/item';

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
  
  constructor( 
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    afDB: AngularFireDatabase) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.angularFirebase = afDB;

  }

  saveItem(){
    console.log("Adding new item")
    let ref = this.angularFirebase.list("users/"+0+"/items").push(new Item(this.form.value.name, this.form.value.price));
    ref.update({id: ref.key });
    
    this.navCtrl.pop();
  }

  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

}
