const SemanticReleaseError = require("@semantic-release/error");
const process = require('process');

const SECRET = process.env.STUDIP_SECRET;

async function success(pluginConfig, context) {

  const {url, prerelease} = pluginConfig;

  console.log(context);
  
}

async function verifyConditions(pluginConfig, context) {

  const {url, prerelease} = pluginConfig;

  if(!url) {
    throw new SemanticReleaseError('Missing parameter url in plugin configuration', 'EINVALIDCONFIG');
  }

  if(!SECRET) {
    throw new SemanticReleaseError('Missing environment variable STUDIP_SECRET', 'EINVALIDCONFIG');
  }

  if(prerelease && typeof prerelease !== 'boolean') {
    throw new SemanticReleaseError('Invalid value for parameter prerelease in plugin configuration', 'EINVALIDCONFIG');
  }

}


module.exports = {success, verifyConditions};