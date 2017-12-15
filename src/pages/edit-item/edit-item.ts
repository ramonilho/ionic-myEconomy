import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { Item } from '../../models/item'

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

  private form : FormGroup;

  item: Item;

  angularFirebase: AngularFireDatabase;
  object: AngularFireObject<Item>;

  constructor( 
    private formBuilder: FormBuilder, 
    public navParams: NavParams,
    public navCtrl: NavController,
    afDB: AngularFireDatabase ) {

      this.angularFirebase = afDB;

      // this.id = this.navParams.get('id');
      this.item = this.navParams.get('data');

      this.form = this.formBuilder.group({
        name: [this.item.name, Validators.required],
        price: [this.item.price, Validators.required],
      });

      console.log("OBJETO TOPPP: "+this.item.name);
  }
  saveItem(){
    console.log("Saving ------");
    console.log(this.item.id);
    // this.angularFirebase.list("users/"+0+"/items")
    let ref = this.angularFirebase.object("users/"+0+"/items/"+this.item.id);
    ref.update( {
      name: this.form.value.name,
      price: this.form.value.price
    })
    this.navCtrl.pop();
    
  }

  deleteItem() {
    console.log("Removing ------");
    let ref = this.angularFirebase.object("users/"+0+"/items/"+this.item.id);
    ref.remove();
    this.navCtrl.pop();
  }


}
