# Github languages
[![Build Status](https://travis-ci.org/honeypotio/git-lang.svg)][travis]

Project for getting a github user's popular languages using public repositories. Currently, it only searches through user's repositories (ignores forked repos) and tallies up all the programming languages used in all projects. The numbers are a sum of all lines in a particular programming language

## Setup
- Clone the repository
- Install node >=v.7. The project uses native [`async await` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) which only works with version 7 and above.
- Run `npm install`
- Run `npm start` and it will serve on `localhost:3000`

## Usage:
- `/user/:username` - Returns aggregated data for a particular user. It's a sum of all languages obtained by adding up languages used in each user's repository.
- `/repos/:username` - Returns a breakdown of user's repos and their specific languages
- `/info/:username` - Returns user's creation date, followers, and starred repositories

## Contributing
------------

1. Add some tests
1. Add some code
1. Run `npm test`
1. Send a pull request

## License
-------

Copyright © 2016 [Honeypot GmbH][honeypotio]. It is free software, and may be
redistributed under the terms specified in the [LICENSE](/LICENSE) file.

## About Honeypot
--------------

[![Honeypot](https://www.honeypot.io/logo.png)][honeypotio]

Honeypot is a developer focused job platform.
The names and logos for Honeypot are trademarks of Honeypot GmbH.

[travis]: https://travis-ci.org/honeypotio/git-lang
[honeypotio]: https://www.honeypot.io?utm_source=github
