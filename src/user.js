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

module.exports.getUser = getUser;
