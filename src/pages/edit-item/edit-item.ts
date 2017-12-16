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

      this.user = this.navParams.get('user');
      this.item = this.navParams.get('data');

      this.form = this.formBuilder.group({
        name: [this.item.name, Validators.required],
        price: [this.item.price, Validators.required],
        date: [this.item.date, Validators.required],
      });

  }
  saveItem(){
    console.log("Saving changes ------");
    // console.log(this.item.id);
    
    // Recuperando objeto
    let ref = this.angularFirebase.object("users/"+this.user.id+"/items/"+this.item.id);
    // Atualizando as informacoes
    ref.update( {
      name: this.form.value.name,
      price: this.form.value.price,
      date: this.form.value.date
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
