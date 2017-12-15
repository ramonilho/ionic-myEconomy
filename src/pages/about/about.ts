import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private todo : FormGroup;
  
  constructor( private formBuilder: FormBuilder ) {
    this.todo = this.formBuilder.group({
      value: ['', Validators.required],
    });
  }
  logForm(){
    console.log(this.todo.value)
  }

  // constructor(public navCtrl: NavController) {

  // }

  // Chart options
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Gastos'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [
    {data: [100, 0], label: 'Gasto'},
    {data: [500, 0], label: 'Limite'}
  ];

}
