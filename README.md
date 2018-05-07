# graphql-notify-errors

[![npm version](https://img.shields.io/npm/v/graphql-notify-errors.svg?style=flat-square)](https://www.npmjs.com/package/graphql-notify-errors)
[![npm downloads](https://img.shields.io/npm/dm/graphql-notify-errors.svg?style=flat-square)](https://www.npmjs.com/package/graphql-notify-errors)
[![devDependency Status](https://img.shields.io/david/dev/eclass/graphql-notify-errors.svg?style=flat-square)](https://david-dm.org/eclass/graphql-notify-errors#info=devDependencies)

> Send errors captured by graphql to sentry, bugsnag or similar

## Installation

```bash
npm i graphql-notify-errors
```

## Use

```js
const { formatError, GraphQLError } = require('graphql')
const express = require('express')
const Raven = require('raven')
const NotifyErrors = require('graphql-notify-errors')

Raven.config(process.env.SENTRY_DSN).install()

const filter = err => !(err instanceof GraphQLError)
const options = {
  formatError,
  filter,
  notify: Raven.captureException
}
const notifyErrors = new NotifyErrors(options)
const app = express()
app.use('/graphql', graphqlExpress(req => {
    return {
      schema,
      context: { req },
      formatError: err => notifyErrors.formatError(err)
    }
  })
)
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
