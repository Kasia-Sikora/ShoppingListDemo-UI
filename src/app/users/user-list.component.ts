import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {IUser} from './user';

@Component({
  selector: 'app-users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})

export class UserListComponent implements OnInit {
    pageTitle = 'User List';
    users: IUser[] = [];
    errorMessage: string;

    constructor(private userService: UserService){
    }

  ngOnInit(): void {
      this.userService.getUsers().subscribe({
        next: users => this.users = users,
        error: err => this.errorMessage = err
      });
  }
}
