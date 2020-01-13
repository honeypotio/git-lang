const request = require('request-promise');
const Config = require('./src/config');
const Repo = require('./src/repo');
const Language = require('./src/language');
const Commits = require('./src/commit');
const User = require('./src/user');
const Contributions = require('./src/contribution');
const app = require('express')();
const port = process.env.PORT || 8080;

// Prettify JSON
app.set('json spaces', 2);

function sumAllLanguages(repoLanguages) {
  let userLanguages = repoLanguages.reduce((acc, repo) => {
    let repoLanguages = Object.keys(repo);
    repoLanguages.forEach(language => {
      acc[language] ? (acc[language] += repo[language]) : acc[language] = repo[language];
    });
    return acc;
  },{});
  return userLanguages;
}
// Get user => get user repos => get all repo languages => get a sum of all languages involved
async function getUserLanguages(user) {
  try {
    let repos = await Repo.getUserRepos(request, `${Config.API_BASE}/users/${user}`);
    let repoNames = repos.map(repo => repo.full_name);
    let repoData = await Promise.all([
      Language.getAllLanguages(request, repoNames),
      Commits.getCommitCount(request, repoNames)
    ]);
    let [repoLanguages, commitData] = repoData;
    let userLanguages = repoLanguages.map((repoData, index) => {
      return {
        name: repoNames[index],
        languages: repoData,
        commits: commitData[index].commits
      }
    });
    return userLanguages;
  } catch (err) {
    throw new Error (err.message);
  }
}

app.get(`/user/:username`, (req, res, next) => {
  getUserLanguages(req.params.username).then(data => {
    let languageData = data.map(repo => repo.languages);
    let aggregatedLanguages = sumAllLanguages(languageData);
    res.json(aggregatedLanguages);
    next();
  }).catch(err => {
    res.status(404);
    res.json({error: err.message});
    next();
  });
});

app.get(`/repos/:username`, (req, res, next) => {
  getUserLanguages(req.params.username).then(data => {
    res.json(data);
  }).catch(err => {
    res.status(404);
    res.json({error: err.message});
    next();
  })
});

app.get(`/info/:username`, (req, res, next) => {
  Promise.all([
    User.getUser(request, req.params.username),
    User.getFollowers(request, req.params.username),
    User.getStarred(request, req.params.username)
  ]).then(([user, followers, starred]) => {
    let { created_at } = user;
    res.json({ created_at, followers, starred });
  }).catch(err => {
    res.status(404);
    res.json({error: err.message});
    next();
  });
});

app.get(`/contributions/:username`, (req, res, next) => {
  Contributions.getContributions(request, req.params.username).then(
      data => res.json(data)
    ).catch(err => {
      res.status(404);
      res.json({error: err.message});
      next();
    });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
