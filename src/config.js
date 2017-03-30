require('dotenv').config();

module.exports = {
  API_BASE: `https://api.github.com`,
  requestOptions: {
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  }
}
