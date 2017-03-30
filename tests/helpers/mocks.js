const user = require('../fixtures/user.json');
const repos = require('../fixtures/repos.json');

module.exports.getUser = function(reqData) {
  if (!reqData.uri.includes('mojombo')) {
    return Promise.reject({message: 'You need to provide a github username'});
  }
  return Promise.resolve(JSON.stringify(user));
}

module.exports.getRepos = function(reqData) {
  if (!reqData.uri.includes('mojombo')) {
    return Promise.reject({message: 'You need to provide a github username'});
  }
  return Promise.resolve(JSON.stringify(repos));
}
