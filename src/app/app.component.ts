import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div><h1>{{ pageTitle }}</h1>
  <div>
    <app-users></app-users>
  </div></div>`
})
export class AppComponent {
  pageTitle = 'Shopping List UI';
}
