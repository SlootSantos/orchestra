const AWS = require('aws-sdk');
const { promisify } = require('util');

// we need to explicitly set the endpoin for local usage
const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  endpoint: 'http://localhost:4569',
  region: 'us-east-1'
});

// i like working with promises
// so i make dynamo return promises
dynamodb.getItem = promisify(dynamodb.getItem);

async function readFromDb(sampleId) {
  const dynamoParams = {
    TableName: 'Orchestra',
    Key: {
      sampleId: {
        S: sampleId
      }
    }
  };

  return dynamodb.getItem(dynamoParams);
}

module.exports = { readFromDb };
