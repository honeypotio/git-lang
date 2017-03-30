const request = require('request-promise');
const Config = require('./src/config');
const Repo = require('./src/repo');

// Get user => get user repos => get all repo languages => get a sum of all languages involved
Repo.getUserRepos(request, `${Config.API_BASE}/users/${'kdamball'}`).then(data => {
  console.log(data.map(r => r.full_name));
});
