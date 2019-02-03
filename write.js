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
dynamodb.putItem = promisify(dynamodb.putItem);

async function writeToDb(sampleId) {
  const dynamoParams = {
    TableName: 'Orchestra',
    Item: {
      sampleId: {
        S: sampleId
      }
    }
  };

  return dynamodb.putItem(dynamoParams);
}

module.exports = { writeToDb };
