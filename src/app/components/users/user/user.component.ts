import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

//User class
import { User } from '../../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(public userService: UserService, public toastr: ToastrService) {}

  ngOnInit(): void {
    this.userService.getUsers();
    //this.resetForm();
  }

  onSubmit(userForm: NgForm) {
    if (userForm.value.$key == null) {
      this.userService.insertUser(userForm.value);
      this.toastr.success('Operación exitosa', 'Usuario agregado');
    } else {
      this.userService.updateUser(userForm.value);
      this.toastr.success('Operación exitosa', 'Usuario modificado');
    }
    this.resetForm(userForm);
  }

  resetForm(userForm?: NgForm) {
    if (!userForm) {
      userForm.reset();
      this.userService.selectedUser = new User();
    }
  }
}
