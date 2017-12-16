import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { Item } from '../../models/item'
import { User } from '../../models/user';

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
  user: User;

  angularFirebase: AngularFireDatabase;
  object: AngularFireObject<Item>;

  constructor( 
    private formBuilder: FormBuilder, 
    public navParams: NavParams,
    public navCtrl: NavController,
    afDB: AngularFireDatabase ) {

      this.angularFirebase = afDB;

      // this.id = this.navParams.get('id');
      this.user = this.navParams.get('user');
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
    
    // Recuperando objeto
    let ref = this.angularFirebase.object("users/"+this.user.id+"/items/"+this.item.id);
    // Atualizando as informacoes
    ref.update( {
      name: this.form.value.name,
      price: this.form.value.price
    })
    .then( _ => {
      this.navCtrl.pop();
    })
    
  }

  deleteItem() {
    console.log("Removing ------");

    // Recuperando e removendo o objeto
    let ref = this.angularFirebase.object("users/"+this.user.id+"/items/"+this.item.id);
    ref.remove().then( _ => {
      this.navCtrl.pop();
    });
    
  }


}
