import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  changeStyle(name: string) {
    const list = document.getElementsByClassName('nav-link');
    for (let i = 0; i < list.length; i++) {
      list[i].classList.remove('active');
      list[i].setAttribute('aria-selected', String(false));
    }
    const navbar = document.getElementById(name);
    navbar.classList.add('active');
    navbar.setAttribute('aria-selected', String(true));
  }
}
