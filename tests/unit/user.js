const Mocks = require('../helpers/mocks');
const User = require('../../src/user');
const assert = require('assert');

const expectedUser = {
  username: 'mojombo',
  repos_url: 'https://api.github.com/users/mojombo/repos'
};

describe(`#User's Github Info`, () => {
  it(`should return user's github information`, (done) => {
    let testUserData = async function(cb) {
      try {
        let user = await User.getUser(Mocks.getUser, `mojombo`);
        assert.equal(expectedUser.username, user.login, `Wrong user returned`);
        assert.equal(expectedUser.repos_url, user.repos_url, `Wrong repo url returned`);
        cb();
      } catch (err) {
        cb(err);
      }
    };

    testUserData(done);
  });
});
