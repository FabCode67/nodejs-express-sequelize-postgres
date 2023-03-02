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

  after(async () => {
    // delete the blog after the tests
    await blog.destroy();
  });

  it('should return a blog when given a valid id', async () => {
    const res = await chai.request(app).get(`/blogs/${blog.id}`);
    expect(res).to.have.status(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.message.id).to.equal(blog.id);
    expect(res.body.message.title).to.equal(blog.title);
    expect(res.body.message.content).to.equal(blog.content);
  });

  it('should return an error when given an invalid id', async () => {
    const res = await chai.request(app).get('/blogs/123');
    expect(res).to.have.status(404);
    expect(res.body.status).to.equal('fail');
    expect(res.body.message).to.equal('blog not found');
  });

  it('should return an error when there is a server error', async () => {
    // mock the findByPk method to throw an error
    Blog.findByPk = () => {
      throw new Error('Mock error');
    };
    const res = await chai.request(app).get(`/blogs/${blog.id}`);
    expect(res).to.have.status(500);
    expect(res.body.status).to.equal('error');
    expect(res.body.message).to.equal('Internal server error');
  });
});
