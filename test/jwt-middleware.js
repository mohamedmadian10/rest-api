const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('../config/jwt-config');

// eslint-disable-next-line no-undef
describe('jwt and auth Middleware', () => {
  // eslint-disable-next-line no-undef
  it('should throw an error if no authorization header is present', () => {
    const req = {
      get() {
        return null;
      },
    };
    expect(jwtMiddleware.bind(this, req, {}, () => {})).to.throw('Not Authenticated.');
  });

  // eslint-disable-next-line no-undef
  it('should throw an error if the authorization header only one string', () => {
    const req = {
      get() {
        return 'abc';
      },
    };
    expect(jwtMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
  // eslint-disable-next-line no-undef
  it('should yield a userData after decoding the token', () => {
    const req = {
      get() {
        return 'Bearer mfshdfjdkfkakkjkkkb';
      },
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userData: { email: 'test@test.com', userId: 'xyz' } });
    jwtMiddleware(req, {}, () => {});
    expect(req).to.have.property('userData');
    // eslint-disable-next-line no-unused-expressions
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
