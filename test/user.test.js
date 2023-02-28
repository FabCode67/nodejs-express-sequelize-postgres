import chai from "chai"
import chaiHttp from "chai-http"
import app from "../src/index"
import { User } from "../models"
chai.use(chaiHttp);

chai.should();
chai.use(chaiHttp);

describe('User Registration', () => {
beforeEach(async () => {
  try {
    await User.destroy({ where: {} });
  } catch (error) {
    console.error(error);
  }
})

  

  it('should create a new user', (done) => {
    chai
      .request(app)
      .post('/api/user/post')
      .send({
        firstName: 'Fabrice',
        lastName: 'MWANAFUNZI',
        username: 'fab',
        email: 'fab@example.com',
        gender: 'male',
        password: 'password123',
        confirm_password: 'password123'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.message.should.have.property('id');
        res.body.message.should.have.property('firstName').eql('Fabrice');
        res.body.message.should.have.property('lastName').eql('MWANAFUNZI');
        res.body.message.should.have.property('username').eql('fab');
        res.body.message.should.have.property('email').eql('fab@example.com');
        res.body.message.should.have.property('gender').eql('male');
        res.body.message.should.have.property('password');
        done();
      });
  })
})