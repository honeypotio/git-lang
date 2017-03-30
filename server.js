const request = require('request-promise');
const Config = require('./src/config');
const Repo = require('./src/repo');
const Language = require('./src/language');
const app = require('express')();

// Get user => get user repos => get all repo languages => get a sum of all languages involved
async function getUserLanguages(user) {
  try {
    let repos = await Repo.getUserRepos(request, `${Config.API_BASE}/users/${user}`);
    let repoNames = repos.map(repo => repo.full_name);
    let repoLanguages = await Language.getAllLanguages(request, repoNames);
    // Sum up all the languages used by the user
    let userLanguages = repoLanguages.reduce((acc, repo) => {
      let repoLanguages = Object.keys(repo);
      repoLanguages.forEach(language => {
        acc[language] ? (acc[language] += repo[language]) : acc[language] = repo[language];
      });
      return acc;
    },{});
    return userLanguages;
  } catch (err) {
    return {
      error: err.message
    }
  }
};

app.get('/user/:username', (req, res, next) => {
  getUserLanguages(req.params.username).then(data => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
    next();
  })
});

app.listen(3000, function() {
  console.log(`listening on port 3000`);
});
