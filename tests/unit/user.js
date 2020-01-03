const Mocks = require('../helpers/mocks');
const User = require('../../src/user');
const assert = require('assert');

describe(`#User's Github Info`, () => {
  it(`should return user's github information`, (done) => {
    const expectedUser = {
      username: 'mojombo',
      repos_url: 'https://api.github.com/users/mojombo/repos',
      created_at: '2012-01-20T02:28:06Z'
    };

    let testUserData = async function(cb) {
      try {
        let user = await User.getUser(Mocks.getUser, `mojombo`);
        assert.equal(expectedUser.username, user.login, `Wrong user returned`);
        assert.equal(expectedUser.repos_url, user.repos_url, `Wrong repo url returned`);
        assert.equal(expectedUser.created_at, user.created_at, `Wrong start date returned`);
        cb();
      } catch (err) {
        cb(err);
      }
    };

    testUserData(done);
  });

  it(`should return user's followers`, (done) => {
    const expectedFollowers = ["tokuda109", "svallory", "weldan", "gavinuhma", "yijie", "filipediasf", "savekirk", "zhuyinan", "constraint", "scrx"];
    let testUserFollowers = async function(cb) {
      try {
        let followers = await User.getFollowers(Mocks.getFollowers, `mojombo`);
        assert.deepEqual(expectedFollowers, followers, `Wrong followers returned`);
        cb();
      } catch (err) {
        cb(err);
      }
    };

    testUserFollowers(done);
  });

  it(`should return user's starred repos`, (done) => {
    const expectedRepos = ["prisma/lift", "prisma/prisma2", "prisma/photonjs", "hammerframework/hammer", "hammerframework/example-invoice"];
    let testUserStarred = async function(cb) {
      try {
        let repos = await User.getStarred(Mocks.getStarred, `mojombo`);
        assert.deepEqual(expectedRepos, repos, `Wrong repos returned`);
        cb();
      } catch (err) {
        cb(err);
      }
    };

    testUserStarred(done);
  });
});
