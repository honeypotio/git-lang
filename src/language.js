const Config = require('./config');

const getRepoLanguages = async function(req, repoName) {
  let options = Object.assign({
    uri: `${Config.API_BASE}/repos/${repoName}/languages`,
    repoName: repoName.replace('/', '-')
  }, Config.requestOptions);

  try {
    let languageData = JSON.parse(await req(options));
    return languageData;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getAllLanguages = async function(req, repos) {
  try {
    let totalLanguageData = await Promise.all(repos.map(repo => {
      return getRepoLanguages(req, repo);
    }));
    return totalLanguageData;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports.getRepoLangs = getRepoLanguages;
module.exports.getAllLanguages = getAllLanguages;
