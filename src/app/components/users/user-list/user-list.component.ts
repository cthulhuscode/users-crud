import { Component, OnInit } from '@angular/core';
//Service
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList: User[];
  constructor(public userService: UserService, public toastr: ToastrService) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .snapshotChanges()
      .subscribe((item) => {
        this.userList = [];
        item.forEach((element) => {
          let x = element.payload.doc.data();
          x['$key'] = element.payload.doc.id;
          this.userList.push(x as User);
        });
      });
  }

  onEdit(user: User) {
    //Send the values to the inputs, Object.assign is to avoid the two-way data binding
    this.userService.selectedUser = Object.assign({}, user);
  }

  onDelete($key: string) {
    this.userService.deleteUser($key);
    this.toastr.success('Operación exitosa', 'Usuario eliminado');
  }
}
