<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Tech Stack 
### <ul><li>NestJS</li><li>MongoDB</li></ul>

## Testing Instructions
#### You can use POSTMAN to check the working, API Endpoints are given below

[https://meta-music01.herokuapp.com/](https://meta-music01.herokuapp.com/) : Base URL for hosted app.

# APIs
<ol>
  <li> <p><b>  /musics </b></p>
    <ul>
      <li>GET Req: Use it to get list of all musics present on DB
      <li>POST Req: Use to add a music to the list with music object sent in body
      <li>PATCH Req: Use it to update a music by sending id of music along with link i.e /musics/{id}
      <li>DELETE Req: Use it to delete a music by sending id of music along with link i.e /musics/{id}
    </ul>
  <li><p><b> /sources </b></p>
    <ul>
      <li>GET Req: Use it to get list of all sources present on DB
      <li>POST Req: Use to add a music to the list with source object sent in body
      <li>PATCH Req: Use it to update a source by sending id of music along with link i.e /sources/{id}
      <li>DELETE Req: Use it to delete a source by sending id of music along with link i.e /sources/{id}
    </ul>
</ol>

#### To test any of the POST req send a JSON object of that particular type(music or source) in the body of POST request. Please refer to the data types mentioned below for reference.
#### For reference there are already few objects present in the database, use GET requests to view them.


#### A cron job runs every 24hrs(12AM UTC) and fetches the metadata about a music object from various sources and updates it in DB.
#### Cron job is set to run every 24 hour, to change that you can change the cron expression in the cron.service.ts file under 'musics' folder.
#### Change it from '0 0 * * * ' to ' */10 * * * * * ' to run it every 10 second.

### Data Types
```javascript
music  {
    id: string
    title: string
    album: string
    artist: string
    year: number
    metaData: [{
        key: string,
        value: string
    }]
}
```

```javascript
sources  {
    name: string
    url: string
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil My??liwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
