const Config = require('./config');

const getUser = async function(req, username) {
  const options = Object.assign({
    uri: `${ Config.API_BASE }/users/${ username }`
  }, Config.requestOptions);

  try {
    let userData = JSON.parse(await req(options));
    return userData;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getFollowers = async function(req, username) {
  const options = Object.assign({
    uri: `${ Config.API_BASE }/users/${ username }/followers?per_page=100`
  }, Config.requestOptions);

  try {
    let followers = JSON.parse(await req(options));
    return followers.map(follower => follower.login);
  } catch (err) {
    throw new Error(err.message);
  }
}

const getStarred = async function(req, username) {
  const options = Object.assign({
    uri: `${ Config.API_BASE }/users/${ username }/starred?per_page=100`
  }, Config.requestOptions);

  try {
    let starredRepos = JSON.parse(await req(options));
    return starredRepos.map(repo => repo.full_name);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports.getUser = getUser;
module.exports.getFollowers = getFollowers;
module.exports.getStarred = getStarred;
