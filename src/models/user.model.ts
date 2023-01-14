import { v4 as uuidv4 } from 'uuid';

import { TUser } from './user.type.js';

class UsersModel {
  private users: TUser[] = [];

  getAllUsers() {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  getUser(id: string) {
    return new Promise((resolve) => {
      const findedUser = this.users.find((user) => user.id === id);
      resolve(findedUser);
    });
  }

  addUser(newUser: TUser) {
    return new Promise((resolve) => {
      const id = uuidv4();
      const user = { ...newUser, id };
      this.users.push(user);
      resolve(user);
    });
  }
}

export const userModel = new UsersModel();
