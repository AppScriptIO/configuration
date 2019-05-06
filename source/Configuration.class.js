const assert = require('assert')

/**
 * An interface for reading configuration object in a way that follows a configuration specification (`appscript` projects configuration rules).
 * TODO: integrate a plugin system to allow extending the configuration api to follow different rules or specifications.
 */
export class Configuration {
  constructor({ configuration = {} }) {
    this.configuration = configuration
    return new Proxy(this, {
      // redirect requests to `this.configuration` when no method on the instance is found.
      get(target, name) {
        if (!target[name]) return target.configuration[name]
        return target[name]
      },
    })
  }

  get rootPath() {
    let rootPath = this.configuration.directory.root
    assert(rootPath, `❌ Configuration 'root path' option must be defined.`) // validate
    return rootPath
  }
}
