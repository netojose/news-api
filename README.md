# News API

## URL's

- Source code: https://github.com/netojose/news-api
- Production URL: https://mistho-api.herokuapp.com
- Production docs: https://mistho-api.herokuapp.com/docs

## Integration

This project works serving API for this another project: https://github.com/netojose/news-site

## Project hosting

This project is hosted on Heroku (please be patient on first request, Heroku free accounts put the machine to sleep when inactive).

## API endpoints

![API routes](https://i.ibb.co/7kqwcxj/Screenshot-2021-06-01-at-22-51-15.png "API routes")

## Tests

![Unit tests report](https://i.ibb.co/khPJd3b/Screenshot-2021-06-03-at-03-11-27.png "Unit tests report")

## Used technologies

- [Ts.ED](https://tsed.io)
- [TypeORM](https://typeorm.io)
- [Jest](https://jestjs.io)
- [Ajv](https://ajv.js.org)
- [Swagger](https://swagger.io)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Got](https://github.com/sindresorhus/got)
- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org)

## Build setup

> **Minimum requirements!** This API requires Node >= 10, Express >= 4 and TypeScript >= 3.

```batch
# install dependencies
$ yarn install

# run tests
$ yarn test:unit

# serve in dev mode
$ yarn start:dev

# build for production
$ yarn build
$ yarn start
```

## About the project

This was my first contact with [Ts.ED](https://tsed.io), and I liked of the result. I decided to learn something new while creating this challenge, instead of use tools I already familiar with. I could to learn quickly about the framework, and was an awesome experience.

## Pending work

- Write unit tests for testing isolated parts of code, because here I used integration tests (because I would like to test many code with a few tests and make sure everything e2e was working)
- On authentication, create a logout process, puting JWT in a black list.
