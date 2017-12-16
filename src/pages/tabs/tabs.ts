import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;

  params: any;

  constructor(public navParams: NavParams) {
    this.params = this.navParams.get('data');
  }
}
