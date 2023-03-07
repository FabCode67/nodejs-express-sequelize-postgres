import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import app from '../src/index'; // your Express app
import { Blog } from '../models'; // your Blog model

chai.use(chaiHttp);

describe('getBlogById', () => {
  let blog;

  before(async () => {
    // create a blog to use in the tests
    blog = await Blog.create({
      title: 'Test Blog',
      content: 'Lorem ipsum dolor sit amet'
    });
  });

  // after(async () => {
  //   // delete the blog after the tests
  //   await blog.destroy();
  // });

  it('should return a blog when given a valid id', async () => {
    const res = await chai.request(app).get(`/api/blog/${blog.id}/get`);
    expect(res).to.have.status(200);
  });

  it('should return an error when given an invalid id', async () => {
    const res = await chai.request(app).get('/api/blog/123');
    expect(res).to.have.status(404);
  
  });

});
