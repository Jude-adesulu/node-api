const { describe, it } = require('mocha');
const chai = require('chai');
const bcrypt = require('bcrypt');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
const db = require('../src/database/db-config');

const testUser = [
    {
      email: 'john@test.com',
      firstname: 'John',
      lastname: 'Doe',
      password: bcrypt.hashSync('Johndoe@1', 10),
      account_no: '1234567890',
      balance: '500',
    },
    {
      email: 'Doe@test.com',
      firstname: 'Doo',
      lastname: 'John',
      password: bcrypt.hashSync('Password@1', 10),
      account_no: '0987654321',
      balance: '0.00',
    },
  ];


  describe('POST /transactions', () => {
    beforeEach(async () => {
      await db('users').del();
      await db('transactions').del();
    });
    after(async () => {
        await db('users').del();
        await db('transactions').del();
      });

        it('Should return success as true and perform a transaction', (done) => {
            db('users').insert(testUser).then(() => {
            chai
                .request(app)
                .post('/api/users/login')
                .send({
                email: 'john@test.com',
                password: 'Johndoe@1',
                })
                .end((err, res) => {
                chai
                    .request(app)
                    .post('/api/transactions/transfer')
                    .set('Authorization', `Bearer ${res.body.data.token}`)
                    .send({
                    amount: '100',
                    receiver: 'test2',
                    })
                    .end((err, res) => {
                    expect(res.status).to.be.eql(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.success).to.be.eql(true);
                    expect(res.body.message).to.be.eql('Transaction successfull');
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.haveOwnProperty('amount');
                    expect(res.body.data.amount).to.be.eql('400.00');
                    expect(res.body.data).to.haveOwnProperty('sender');
                    expect(res.body.data.sender).to.be.eql('1234567890');
                    expect(res.body.data).to.haveOwnProperty('receiver');
                    expect(res.body.data.receiver).to.be.eql('0987654321');
                    done();
                    });
                });
            });
            done();
  });
});
