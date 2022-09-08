const SemanticReleaseError = require("@semantic-release/error");
const process = require('process');
const axios = require("axios");
const crypto = require('crypto');

const SECRET = process.env.STUDIP_SECRET;

async function success(pluginConfig, context) {

  const {url, prerelease} = pluginConfig;

  const {logger, branch} = context;

  const type = branch.type;

  if(type === 'release' || (type === 'prerelease' && prerelease)) {
    logger.log("Sending request to studip webhook");

    const hash = crypto.createHmac('sha256', SECRET)

    const body = {};

    await axios.post(url, body, {headers: {
      "x-hub-signature-256": hash.update(body).digest('hex')
    }})

    logger.log("Successfully notified studip about release");
  }
  
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