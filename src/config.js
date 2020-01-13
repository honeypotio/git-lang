require('dotenv').config();

const token = Buffer.from(`${process.env.GITHUB_USERNAME}:${process.env.GITHUB_TOKEN}`).toString('base64')

module.exports = {
  API_BASE: `https://api.github.com`,
  requestOptions: {
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': `Basic ${token}`,
      'Accept': 'application/vnd.github.cloak-preview'
    }
  }
}
