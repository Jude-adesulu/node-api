const { describe, it } = require('mocha');
const chai = require('chai');
const bcrypt = require('bcrypt');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
const db = require('../src/database/db-config');

const info = {
    firstname: 'John',
    lastname: 'DOe',
    email: 'John@doe.com',
    password: bcrypt.hashSync('Johndoe@1', 10),
    account_no: '1234567890',
};

const testWithdraw = {
  balance: '500',
  ...info,
};


describe('TEST API ', () => {
  beforeEach(async () => {
    await db('users').del();
    await db('transactions').del();
  });

  after(async () => {
    await db('users').del();
    await db('transactions').del();
  });
  
  describe("POST /api/users/sign-up", () =>{
    it('Should return user info after the creation of user account', (done) => {
        chai
          .request(app)
          .post('/api/users/sign-up')
          .send({
            firstname: 'John',
            lastname: 'Doe',
            email: 'John@doe.com',
            password: 'Johndoe@1',
          })
          .end((err, res) => {
            expect(res.status).to.be.eql(201);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.be.eql(true);
            expect(res.body.message).to.be.eql('User created successfully');
            expect(res.body.data).to.haveOwnProperty('token');
            expect(res.body.data.user).to.haveOwnProperty('account_no');
            expect(res.body.data).to.haveOwnProperty('user');
            done();
          });
      });

      it('Should return success as false and email not allowed to be empty', (done) => {
        chai
          .request(app)
          .post('/api/users/sign-up')
          .send({
            firstname: 'John',
            lastname: 'Doe',
            email: '',
            password: 'Johndoe@1',
          })
          .end((err, res) => {
            expect(res.status).to.be.eql(422);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.be.eql(false);
            expect(res.body.message).to.be.eql('"email" is not allowed to be empty');
            done();
          });
      });

      it('Should return success as false and email not allowed to be empty', (done) => {
        chai
          .request(app)
          .post('/api/users/sign-up')
          .send({
            firstname: 'John',
            lastname: 'Doe',
            email: '',
            password: 'Johndoe@1',
          })
          .end((err, res) => {
            expect(res.status).to.be.eql(422);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.be.eql(false);
            expect(res.body.message).to.be.eql('"email" is not allowed to be empty');
            done();
          });
      });

      it('Should return success as false when password doesnot match the pattern', (done) => {
        chai
          .request(app)
          .post('/api/users/sign-up')
          .send({
            firstname: 'John',
            lastname: 'Doe',
            email: 'jon@doe.com',
            password: 'John1',
          })
          .end((err, res) => {
            expect(res.status).to.be.eql(422);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.be.eql(false);
            expect(res.body.message).to.be.eql('Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length');
            done();
          });
      });

      it('Should return success as false when firstname is not entered', (done) => {
        chai
          .request(app)
          .post('/api/users/sign-up')
          .send({
            firstname: '',
            lastname: 'doe',
            email: 'jon@doe.com',
            password: 'John1',
          })
          .end((err, res) => {
            expect(res.status).to.be.eql(422);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.be.eql(false);
            done();
          });
      });
  })

  describe("POST /api/users/login", () =>{
    it('Should return success as true when credentials are correct', (done) => {
        db('users').insert(info).then((id) => db('users').where({ id }).first()).then((user) => {
            chai
              .request(app)
              .post('/api/users/login')
              .send({
                email: user.email,
                password: 'Johndoe@1',
              })
              .end((err, res) => {
                expect(res.status).to.be.eql(200);
                expect(res.body).to.be.an('object');
                expect(res.body.success).to.be.eql(true);
                expect(res.body.message).to.be.eql('User logged in successfully');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.haveOwnProperty('token');
                expect(res.body.data).to.haveOwnProperty('user');
                expect(res.body.data).to.haveOwnProperty('transactions');
                done();
              });
          });
          done();
      });

      it('Should return success as false when password in incorrect', (done) => {
        db('users').insert(info).then((id) => db('users').where({ id }).first()).then((user) => {
            chai
              .request(app)
              .post('/api/users/login')
              .send({
                email: user.email,
                password: 'pass',
              })
              .end((err, res) => {
                expect(res.status).to.be.eql(422);
                expect(res.body).to.be.an('object');
                expect(res.body.success).to.be.eql(true);
                expect(res.body.message).to.be.eql('Invalid password');
                done();
              });
          });
          done();
      });

      it('Should return success as true when logged in user makes a deposit', (done) => {
        db('users').insert(info).then((id) => db('users').where({ id }).first()).then((user) => {
            chai
              .request(app)
              .post('/api/users/login')
              .send({
                email: user.email,
                password: 'Johndoe@1',
              })
              .end((err, res) => {
                chai
                .request(app)
                .post('/api/users/deposit')
                .set('Authorization', `Bearer ${res.body.data.token}`)
                .send({
                amount: '200',
              })
              .end((err,res)=>{
                  expect(res.status).to.be.eql(200);
                  expect(res.body).to.be.an('object');
                  expect(res.body.success).to.be.eql(true);
                  expect(res.body.message).to.be.eql('Deposit successful');
                  expect(res.body.data).to.haveOwnProperty('balance');
                  expect(res.body.data).to.haveOwnProperty('user');
                  expect(res.body.data.balance).to.be.eql('200.00');
                  done();
                })
              });
            });
          done();
      });


      it('Should return success to be true when a withdraw from account', (done) => {
        db('users').insert(testWithdraw).then((id) => db('users').where({ id }).first()).then((user) => {
            chai
              .request(app)
              .post('/api/users/login')
              .send({
                email: user.email,
                password: 'Johndoe@1',
              })
              .end((err, res) => {
                chai
                .request(app)
                .post('/api/users/withdraw')
                .set('Authorization', `Bearer ${res.body.data.token}`)
                .send({
                amount: '100',
              })
              .end((err,res)=>{
                  expect(res.status).to.be.eql(200);
                  expect(res.body).to.be.an('object');
                  expect(res.body.success).to.be.eql(true);
                  expect(res.body.message).to.be.eql('Withdrawal successful');
                  expect(res.body.data).to.haveOwnProperty('balance');
                  expect(res.body.data).to.haveOwnProperty('user');
                  expect(res.body.data.balance).to.be.eql('400.00');
                  done();
                })
              });
            });
          done();
      })
  })

});