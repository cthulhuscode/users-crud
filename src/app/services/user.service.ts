import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCollection: AngularFirestoreCollection<any>;
  selectedUser: User = new User();

  constructor(private afs: AngularFirestore) {}

  getUsers() {
    //Get all the users inside the collection
    return (this.userCollection = this.afs.collection('users'));
  }

  insertUser(user: User) {
    //Save user in the db
    this.userCollection.add({
      nombre: user.nombre,
      apellidos: user.apellidos,
      fecha: user.fecha,
    });
  }

  updateUser(user: User) {
    //Send key and the data to update
    this.userCollection.doc(user.$key).update({
      nombre: user.nombre,
      apellidos: user.apellidos,
      fecha: user.fecha,
    });
  }

  deleteUser($key: string) {
    this.userCollection.doc($key).delete();
  }
}
