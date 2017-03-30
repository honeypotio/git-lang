const Config = require('../../src/config');
const Mocks = require('../helpers/mocks');
const Repos = require('../../src/repo');
const assert = require('assert');

const expectedRepos = [
  "mojombo/30daysoflaptops.github.io",
  "mojombo/asteroids",
  "mojombo/benbalter.github.com",
  "mojombo/bert",
  "mojombo/bert.erl",
  "mojombo/bertrpc",
  "mojombo/bower"
];

const expectedUserRepos = [
  "mojombo/asteroids",
  "mojombo/bert",
  "mojombo/bert.erl",
  "mojombo/bertrpc"
];

describe(`#User's repos info`, () => {
  it(`should return user's repo info`, (done) => {
    let testRepoData = async function(cb) {
      try {
        let repoList = await Repos.getAllRepos(Mocks.getRepos, `${Config.API_BASE}/users/mojombo/repos`);
        let repoNames = repoList.map(repo => repo.full_name);
        assert.deepEqual(expectedRepos, repoNames, `We are missing repo data`);
        cb();
      } catch (err) {
        cb(err);
      }
    }

    testRepoData(done);
  });

  it(`should ignore forked repos`, (done) => {
    let testSourceRepos = async function(cb) {
      try {
        let repoList = await Repos.getUserRepos(Mocks.getRepos, `${Config.API_BASE}/mojombo/repos`);
        let userRepos = repoList.map(repo => repo.full_name);
        assert.deepEqual(expectedUserRepos, userRepos, `We are missing user's personal repos`);
        cb();
      } catch (err) {
        cb(err)
      }
    }

    testSourceRepos(done);
  });
});
