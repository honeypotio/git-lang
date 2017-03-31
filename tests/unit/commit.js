const Config = require('../../src/config');
const Mocks = require('../helpers/mocks');
const Commits = require('../../src/commit');
const assert = require('assert');

const expected = [
  {
    name: "mojombo/asteroids",
    commits: 12
  },
  {
    name: "mojombo/bert",
    commits: 59
  },
  {
    name: "mojombo/bert.erl",
    commits: 4
  },
  {
    name: "mojombo/bertrpc",
    commits: 68
  }
];

describe(`#User commit count`, function() {
  it(`should return the number of commits a user has in a repository`, (done) => {
    let testCommitData = async function(cb) {
      try {
        let repos = [
          "mojombo/asteroids",
          "mojombo/bert",
          "mojombo/bert.erl",
          "mojombo/bertrpc"
        ];

        let commitCount = await Commits.getCommitCount(Mocks.getContributions, repos);
        assert.deepEqual(expected, commitCount);
        cb();
      } catch (err) {
        cb(err);
      }
    }

    testCommitData(done);
  });
});
