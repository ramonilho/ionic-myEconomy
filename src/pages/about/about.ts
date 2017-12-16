import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../../models/item';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  firebase: AngularFireDatabase;

  private form : FormGroup;

  items: Observable<any[]>;
  user: User;
  subscription: Subscription;

  encharges: Number = 0;
  
  constructor(private formBuilder: FormBuilder, 
              private navParams: NavParams,
              afDB: AngularFireDatabase) {
    
    this.form = this.formBuilder.group({
      limit: ['', Validators.required],
    });

    let currentDate = new Date();
    currentDate.toISOString

    this.user = this.navParams.data;
    this.firebase = afDB;

    this.subscription = afDB.list("users/"+this.user.id+"/items", ref => {
            let query = ref.orderByChild('date');
            return query;
          })
          .valueChanges()
          .subscribe(arr => {

            this.encharges = 0;

            arr.map(value => {
              let item = <Item> value;
              // console.log("value -> "+JSON.stringify(item));
              this.encharges = +this.encharges + +item.price;
              this.barChartData = [
                {data: [this.encharges, 0], label: 'Gasto'},
                {data: [this.user.limit, 0], label: 'Limite'}
              ];
            })

            console.log("encharges: "+this.encharges);

     });
  }

  saveLimit(){
    // console.log(this.form.value)
    let ref = this.firebase.object("users/"+this.user.id);
    // Atualizando as informacoes
    ref.update({
      limit: this.form.value.limit,
    })
    .then( _ => {
      this.user.limit = this.form.value.limit;
      this.barChartData = [
        {data: [this.encharges, 0], label: 'Gasto'},
        {data: [this.user.limit, 0], label: 'Limite'}
      ];
    })
  }

  // Chart options
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Gastos'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [
    {data: [this.encharges, 0], label: 'Gasto'},
    {data: [500, 0], label: 'Limite'}
  ];

  ionViewWillUnload(){
    this.subscription.unsubscribe();
  }

}
