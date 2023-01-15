import request from 'supertest';

import { server } from '../index';
import { TUser } from '../models/index';
import { ErrorMessages, ValidateMessage, baseUrl } from '../common/config';

let firstUser: TUser = {
  username: 'Maxim',
  age: 26,
  hobbies: ['js', 'nodejs'],
};

const secondUser: TUser = {
  username: 'Peter',
  age: 14,
  hobbies: ['python', 'django'],
};

describe('Testing CRUD-API', () => {
  describe('Scenario 1', () => {
    let id = '';
    let secondId = '';

    it('Should return empty array of users', async () => {
      const { body, statusCode } = await request(server).get(baseUrl);

      expect(statusCode).toEqual(200);
      expect(body).toEqual([]);
    });

    it('Should create user', async () => {
      const { body, statusCode } = await request(server)
        .post(baseUrl)
        .send(firstUser);

      expect(statusCode).toEqual(201);
      expect(body.username).toEqual(firstUser.username);
      expect(body.age).toEqual(firstUser.age);
      expect(JSON.stringify(body.hobbies)).toEqual(
        JSON.stringify(firstUser.hobbies),
      );

      id = body.id;
    });

    it('Should get user by id', async () => {
      const { body, statusCode } = await request(server).get(
        `${baseUrl}/${id}`,
      );

      expect(statusCode).toEqual(200);
      expect(JSON.stringify(body)).toEqual(
        JSON.stringify({ ...firstUser, id }),
      );
    });

    it('Should update user by id', async () => {
      firstUser = { ...firstUser, hobbies: [...firstUser.hobbies, 'testing'] };

      const { body, statusCode } = await request(server)
        .put(`${baseUrl}/${id}`)
        .send(firstUser);

      expect(statusCode).toEqual(200);
      expect(body.username).toEqual(firstUser.username);
      expect(body.age).toEqual(firstUser.age);
      expect(JSON.stringify(body.hobbies)).toEqual(
        JSON.stringify(firstUser.hobbies),
      );
      expect(body.id).toEqual(id);
    });

    it('Should create second user', async () => {
      const response = await request(server).post(baseUrl).send(secondUser);

      secondId = response.body.id;

      const { body, statusCode } = await request(server).get(baseUrl);

      expect(statusCode).toEqual(200);
      expect(body.length).toEqual(2);

      const [user1, user2] = body;
      delete user1.id;
      delete user2.id;

      expect(JSON.stringify(user1)).toEqual(JSON.stringify(firstUser));
      expect(JSON.stringify(user2)).toEqual(JSON.stringify(secondUser));
    });

    it('Should delete first user', async () => {
      const { statusCode } = await request(server).delete(`${baseUrl}/${id}`);

      expect(statusCode).toEqual(204);

      const { body } = await request(server).get(baseUrl);

      expect(JSON.stringify(body)).toEqual(
        JSON.stringify([{ ...secondUser, id: secondId }]),
      );
    });
  });

  describe('Scenario 2', () => {
    let id = '';

    it(`Should return message "${ValidateMessage.ENDPOINT}"`, async () => {
      const { body, statusCode } = await request(server).get('/invalid_url');

      expect(statusCode).toEqual(404);
      expect(body.message).toEqual(ValidateMessage.ENDPOINT);
    });

    it('Should return message about invalid body', async () => {
      const { body, statusCode } = await request(server)
        .post(baseUrl)
        .send({ ...firstUser, hobbies: null });

      expect(statusCode).toEqual(400);
      expect(body.message).toEqual(ValidateMessage.BODY);
    });

    it(`Should return message "${ValidateMessage.UUID}"`, async () => {
      const { body, statusCode } = await request(server).get(
        `${baseUrl}/invalid_uuid`,
      );

      expect(statusCode).toEqual(400);
      expect(body.message).toEqual(ValidateMessage.UUID);
    });

    it(`Should return message "${ErrorMessages.USER_NOT_FOUND}"`, async () => {
      const res = await request(server).post(baseUrl).send(firstUser);

      id = res.body.id;

      await request(server).delete(`${baseUrl}/${id}`);

      const { body, statusCode } = await request(server).get(
        `${baseUrl}/${id}`,
      );

      expect(statusCode).toEqual(404);
      expect(body.message).toEqual(ErrorMessages.USER_NOT_FOUND);
    });
  });

  describe('Scenario 3', () => {
    let id = '';

    it('Should return 3 users', async () => {
      const promises: any = [];

      for (let i = 0; i < 2; i += 1) {
        promises.push(
          request(server)
            .post(baseUrl)
            .send({ ...firstUser, age: firstUser.age + i }),
        );
      }

      await Promise.all(promises);

      const { body } = await request(server).get(baseUrl);

      expect(body.length).toEqual(3);

      id = body[1].id;
    });

    it('Should get updated user with selected id', async () => {
      const response = await request(server).get(`${baseUrl}/${id}`);
      const updatedUser = { ...response.body, hobbies: [] };

      delete updatedUser.id;

      const { body, statusCode } = await request(server)
        .put(`${baseUrl}/${id}`)
        .send(updatedUser);

      expect(statusCode).toEqual(200);
      expect(JSON.stringify(body)).toEqual(
        JSON.stringify({ ...updatedUser, id }),
      );
    });

    it('Should return "User is not found"', async () => {
      await request(server).delete(`${baseUrl}/${id}`);

      const { body, statusCode } = await request(server).get(
        `${baseUrl}/${id}`,
      );

      expect(statusCode).toEqual(404);
      expect(body.message).toEqual(ErrorMessages.USER_NOT_FOUND);
    });
  });
  afterAll(() => {
    server.close();
  });
});
