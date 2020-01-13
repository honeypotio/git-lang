const Mocks = require('../helpers/mocks');
const Language = require('../../src/language');
const assert = require('assert');

const expectedLangData = {
  "JavaScript": 24107,
  "CoffeeScript": 2592,
  "CSS": 242
}

const expectedTotalLangData = [
  expectedLangData,
  {
    "Ruby": 31821,
    "C": 11777
  },
  {
    "Erlang": 2243
  },
  {
    "Ruby": 21290
  }
]

describe(`#Repo languages`, () => {
  it(`should return programming languages used in a repo`, (done) => {
    let testLangData = async function(cb) {
      try {
        let repo = `mojombo/asteroids`;
        let langData = await Language.getRepoLangs(Mocks.getRepoLanguage, repo);
        assert.deepEqual(expectedLangData, langData, `We got the wrong language data`);
        cb();
      } catch (err) {
        cb(err);
      }
    };

    testLangData(done);
  });

  it(`should return all languages from all repos provided`, (done) => {
    let testAllLangData = async function(cb) {
      try {
        let repos = [
          "mojombo/asteroids",
          "mojombo/bert",
          "mojombo/bert.erl",
          "mojombo/bertrpc"
        ];
        let allLangData = await Language.getAllLanguages(Mocks.getRepoLanguage, repos);
        assert.deepEqual(expectedTotalLangData, allLangData);
        cb();
      } catch (err) {
        cb(err);
      }
    };

    testAllLangData(done);
  });
});
