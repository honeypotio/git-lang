const getRepos = async function(req, userUrl) {
  const options = {
    uri: `${userUrl}/repos`,
    headers: {
      'User-Agent': 'Request-Promise'
    }
  };
  
  try {
    let reposList = JSON.parse(await req(options));
    return reposList;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserRepos = async function(req, userUrl) {
  try {
    let allRepos = await getRepos(req, userUrl);
    return allRepos.filter(repo => !repo.fork);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports.getAllRepos = getRepos;

module.exports.getUserRepos = getUserRepos;