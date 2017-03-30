const Config = require('./config');

const getUser = async function(req, username) {
  const options = {
    uri: `${ Config.API_BASE }/users/${ username }`,
    headers: {
      'User-Agent': 'Request-Promise'
    }
  };

  try {
    let userData = JSON.parse(await req(options));
    return userData;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports.getUser = getUser;
