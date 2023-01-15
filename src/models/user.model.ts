import { v4 as uuidv4 } from 'uuid';

import { StatusCode } from '../common/config';
import { TUser } from './user.type';

class Users {
  private users: TUser[] = [];

  getAll(): Promise<TUser[]> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  getById(id: string): Promise<TUser | undefined> {
    return new Promise((resolve) => {
      const foundUser = this.users.find((user) => user.id === id);

      resolve(foundUser);
    });
  }

  createUser(newUser: TUser): Promise<TUser> {
    return new Promise((resolve) => {
      const id = uuidv4();
      const user = { ...newUser, id };

      this.users.push(user);
      resolve(user);
    });
  }

  updateById(user: TUser): Promise<TUser | null> {
    return new Promise((resolve) => {
      const userToUpdate = this.users.find(
        (userInBd) => userInBd.id === user.id,
      );

      if (!userToUpdate) {
        resolve(null);
      } else {
        const userIdx = this.users.findIndex(
          (userInBd) => userInBd.id === user.id,
        );

        this.users[userIdx] = user;
        resolve(user);
      }
    });
  }

  deleteById(id: string): Promise<number> {
    return new Promise((resolve) => {
      const userIdx = this.users.findIndex((user) => user.id === id);

      if (userIdx === -1) {
        resolve(StatusCode.NOT_FOUND);
      } else {
        this.users = [
          ...this.users.slice(0, userIdx),
          ...this.users.slice(userIdx + 1),
        ];
        resolve(StatusCode.N0_CONTENT);
      }
    });
  }
}

export const userModel = new Users();
