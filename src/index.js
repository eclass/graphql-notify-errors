'use strict'

/**
 * Class to notify errors
 * @example
 * const { formatError, GraphQLError } = require('graphql')
 * const filter = err => !(err instanceof GraphQLError)
 * const options = { formatError, filter, notify: bugsnag.notify }
 * const notifyErrors = new NotifyErrors(options)
 */
module.exports = class NotifyErrors {
  /**
   * @external {formatError} http://graphql.org/graphql-js/error/#formaterror
   */
  /**
   * @typedef NotifyOptions
   * @property {formatError} formatError GraphQL function formatError or custom
   * @property {Function} notify Function to send errors
   * @property {Function} filter Function to filter errors
   */
  /**
   * @param {NotifyOptions} options
   */
  constructor (options = {}) {
    this._filter = options.filter
    this._notify = options.notify
    this._formatError = options.formatError
  }

  /**
   * @external {GraphQLError} http://graphql.org/graphql-js/error/#graphqlerror
   */
  /**
   * Middelware to filter and notify errors.
   * @param {GraphQLError} err GraphQL error
   * @returns {Object} GraphQL formatError
   */
  formatError (err) {
    let notify = true
    if (typeof this._filter === 'function') {
      notify = this._filter(err)
    }
    if (typeof this._notify === 'function' && notify) this._notify(err)
    return this._formatError(err)
  }
}
