import {Component} from '@angular/core';
import {ModalService} from './utils/modal';

@Component({
  templateUrl: './app.component.html',
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pageTitle = 'Shopping List';

  bodyText: string;


  constructor(private modalService: ModalService) {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
