const SemanticReleaseError = require("@semantic-release/error");
const process = require('process');
const axios = require("axios");

const URL = process.env.STUDIP_WEBHOOK_URL;

async function success(pluginConfig, context) {

  const {prerelease} = pluginConfig;

  const {logger, branch} = context;

  const type = branch.type;

  if(type === 'release' || (type === 'prerelease' && prerelease)) {
    logger.log("Sending request to studip webhook");

    await axios.post(URL);

    logger.log("Successfully notified studip about release");
  }
  
}

async function verifyConditions(pluginConfig, context) {

  const {prerelease} = pluginConfig;

  if(!URL) {
    throw new SemanticReleaseError('Missing environment variable STUDIP_WEBHOOK_URL', 'EINVALIDCONFIG');
  }

  if(prerelease && typeof prerelease !== 'boolean') {
    throw new SemanticReleaseError('Invalid value for parameter prerelease in plugin configuration', 'EINVALIDCONFIG');
  }

}


module.exports = {success, verifyConditions};