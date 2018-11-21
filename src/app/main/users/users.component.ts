import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/interfaces';
import {UsersService} from '../../shared/services/users.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public users: User[];
  public size = 6;
  public loading = false;
  public isNew = true;
  public oSub: Subscription;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.loading = true;
    this.oSub = this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }

  public updateUserList(): void {
    if (this.size >= this.users.length) {
      this.usersService.size = 6;
      this.oSub = this.usersService.getUsers().subscribe(users => {
        this.users = users;
      });
    }
  }

  public onChange(): void {
    this.usersService.setSize();
    this.size = this.usersService.size;
    this.loading = true;
    this.oSub = this.usersService.getUsers().subscribe(users => {
      this.users = users;
      if (this.size > users.length) {
        this.isNew = false;
      }
      this.loading = false;
    });
  }

}
