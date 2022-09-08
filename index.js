const SemanticReleaseError = require("@semantic-release/error");

async function success(pluginConfig, context) {

  const {url, prerelease} = pluginConfig;

}

async function verifyConditions(pluginConfig, context) {

  const {url, prerelease} = pluginConfig;

  if(!url) {
    throw new SemanticReleaseError('Missing parameter url in plugin configuration', 'EINVALIDCONFIG');
  }

}


module.exports = {success, verifyConditions};