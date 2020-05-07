import {Component} from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="card welcome">
      <div id="title">
        {{pageTitle}}
      </div>
    </div>
  `,
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  public pageTitle = 'Welcome!';
}
