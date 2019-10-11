const AWS = require('aws-sdk');

AWS.config.update({
  credentials: {
    accessKeyId: 'noop',
    secretAccessKey: 'noop',
  },
  endpoint: 'http://flexion.local:8000',
  region: 'us-east-1',
});

const dynamo = new AWS.DynamoDB();
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TableName = 'ustc';

const deleteTable = async () => {
  try {
    await dynamo
      .deleteTable({
        TableName,
      })
      .promise();
    console.log('table deleted');
  } catch (error) {
    console.log('no table to delete');
    return Promise.resolve();
  }
};

const createTable = async () => {
  console.log('creating table');
  return dynamo
    .createTable({
      AttributeDefinitions: [
        {
          AttributeName: 'pk',
          AttributeType: 'S',
        },
        {
          AttributeName: 'sk',
          AttributeType: 'S',
        },
        {
          AttributeName: 'gsi1pk',
          AttributeType: 'S',
        },
        {
          AttributeName: 'gsi1sk',
          AttributeType: 'S',
        },
        {
          AttributeName: 'gsi2pk',
          AttributeType: 'S',
        },
        {
          AttributeName: 'gsi2sk',
          AttributeType: 'S',
        },
        {
          AttributeName: 'gsi3pk',
          AttributeType: 'S',
        },
        // {
        //   AttributeName: 'gsi3sk',
        //   AttributeType: 'S',
        // },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'gsi1',
          KeySchema: [
            {
              AttributeName: 'gsi1pk',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'gsi1sk',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
        {
          IndexName: 'gsi2',
          KeySchema: [
            {
              AttributeName: 'gsi2pk',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'gsi2sk',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
        {
          IndexName: 'gsi3',
          KeySchema: [
            {
              AttributeName: 'gsi3pk',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'pk',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
      KeySchema: [
        {
          AttributeName: 'pk',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'sk',
          KeyType: 'RANGE',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName,
    })
    .promise();
};

const init = async () => {
  await deleteTable();
  await createTable();
  return { TableName, dynamo, dynamoClient };
};

module.exports = { init };
