import supertest from 'supertest';
import createServer from '../utils/createServer';
import db from '../utils/database';

// this tutorial is pretty nice
// https://losikov.medium.com/part-4-node-js-express-typescript-unit-tests-with-jest-5204414bf6f0

const app = createServer();
const TIMEOUT = 10 * 10000; // 20 seconds

/* setting up database */
beforeAll(async (done) => {
  await db.open();
  done();
}, TIMEOUT);

/* kill database string after all tests */
afterAll(async (done) => {
  try {
    await db.close();
    done();
  } catch (error) {
    console.log(error);
    throw error;
  }
}, TIMEOUT);

// succesful signup test
test(
  'user signup success test',
  async (done) => {
    const data = {
      firstName: 'Tester',
      lastName: 'Smith',
      email: 'test@gmail.com',
      password: '123456',
      institutionName: 'My Company',
    };

    await supertest(app)
      .post('/api/users/signup/')
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body.success).toBe(true);
        done();
      });
  },
  TIMEOUT
);

// succesful login test
test(
  'user login success test',
  async (done) => {
    const data = {
      email: 'test@gmail.com',
      password: '123456',
    };

    await supertest(app)
      .post('/api/users/login/')
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.body.success).toBe(true);
        expect(response.body.accessToken).toBeTruthy();
        expect(response.body.refreshToken).toBeTruthy();
        done();
      });
  },
  TIMEOUT
);

// failed login
test(
  'user login failure test',
  async (done) => {
    const data = {
      email: 'test@gmail.com',
      password: '12345688',
    };

    await supertest(app)
      .post('/api/users/login/')
      .send(data)
      .expect(400)
      .then(async (response) => {
        expect(response.body.success).toBe(false);
        done();
      });
  },
  TIMEOUT
);
