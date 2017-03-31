const Config = require('./config');

const getRepoContributions = async function(req, repoName) {
  let options = Object.assign({
    uri: `${Config.API_BASE}/repos/${repoName}/contributors`,
    repoName: repoName.replace('/', '-'),
    resolveWithFullResponse: true
  }, Config.requestOptions);

  try {
    let username = repoName.split('/')[0];
    let response = await req(options);
    // This is most likely an empty repo
    if (response.statusCode === 204) {
      return {
        contributions: 0
      };
    }
    let contributionData = JSON.parse(response.body);
    let user = contributionData.find(contributor => contributor.login === username);
    // If for some reason, the user isn't in the list of contributors
    if (!user) {
      return {
        contributions: 0
      };
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

const getAllCommits = async function(req, repos) {
  try {
    let totalContributionsData = await Promise.all(repos.map(repo => {
      return getRepoContributions(req, repo);
    }));
    let commitData = totalContributionsData.map((repo, index) => {
      return {
        name: repos[index],
        commits: repo.contributions
      };
    })
    return commitData;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports.getCommitCount = getAllCommits;
