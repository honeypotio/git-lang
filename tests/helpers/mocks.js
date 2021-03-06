const user = require('../fixtures/user.json');
const repos = require('../fixtures/repos.json');
const followers = require('../fixtures/followers.json');
const starred = require('../fixtures/starred.json');

module.exports.getUser = function(reqData) {
  if (!reqData.uri.includes('mojombo')) {
    return Promise.reject({message: 'You need to provide a github username'});
  }
  return Promise.resolve(JSON.stringify(user));
}

module.exports.getFollowers = function(reqData) {
  if (!reqData.uri.includes('mojombo')) {
    return Promise.reject({message: 'You need to provide a github username'});
  }
  return Promise.resolve(JSON.stringify(user));
}

module.exports.getFollowers = function(reqData) {
  if (!reqData.uri.includes('mojombo')) {
    return Promise.reject({message: 'You need to provide a github username'});
  }
  return Promise.resolve(JSON.stringify(followers));
}

module.exports.getStarred = function(reqData) {
  if (!reqData.uri.includes('mojombo')) {
    return Promise.reject({message: 'You need to provide a github username'});
  }
  return Promise.resolve(JSON.stringify(starred));
}

module.exports.getRepos = function(reqData) {
  if (!reqData.uri.includes('mojombo')) {
    return Promise.reject({message: 'You need to provide a github username'});
  }
  return Promise.resolve(JSON.stringify(repos));
}

module.exports.getRepoLanguage = function(reqData) {
  if (!reqData.uri.includes('mojombo')) {
    return Promise.reject({message: 'You need to provide a github username'});
  }
  let repoData = require(`../fixtures/languages/${reqData.repoName}.json`);
  return Promise.resolve(JSON.stringify(repoData));
}

module.exports.getContributions = function(reqData) {
  if (!reqData.uri.includes('mojombo')) {
    return Promise.reject({message: 'You need to provide a github username'});
  }
  let repoData = require(`../fixtures/commits/${reqData.repoName}.json`);
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify(repoData)
  });
}
