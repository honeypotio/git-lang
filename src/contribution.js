const Config = require('./config');

const makeRequest = async (req, username, page) => {
  const options = Object.assign({
    uri: `${ Config.API_BASE }/search/commits?q=author:${username}&type=commits&sort=committer-date&order=desc&per_page=100&page=${page}`
  }, Config.requestOptions);

  let data = JSON.parse(await req(options));
  return data.items
          .filter(result => !result.repository.fork && result.committer && result.committer.login === username)
          .map(result => result.repository.full_name);
}

const getContributions = async function(req, username) {

  try {
    let allResults = await Promise.all(Array(10).fill(null).map((el, index) => makeRequest(req, username, index+1)));

    return [...new Set([].concat(...allResults))];
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  getContributions
}
