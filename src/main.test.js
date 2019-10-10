const { init } = require('./schema');
const { cases, users, workItems } = require('./seed');

let TableName, dynamo, dynamoClient;

describe('verify dynamodb schema', () => {
  it('creates the table', async () => {
    const result = await init();
    TableName = result.TableName;
    dynamo = result.dynamo;
    dynamoClient = result.dynamoClient;

    expect(TableName).toBeDefined();
    expect(dynamo).toBeDefined();
    expect(dynamoClient).toBeDefined();
  });

  it('seeds the table', async () => {
    const seeds = [].concat(cases, users, workItems);
    for (const Item of seeds) {
      await dynamoClient
        .put({
          Item,
          TableName,
        })
        .promise();
    }
    const items = await dynamoClient
      .scan({
        TableName,
      })
      .promise();
    expect(items.Count).toEqual(4);
  });

  it('get user Eric by email', async () => {
    const results = await dynamoClient
      .get({
        Key: { pk: 'eric@example.com', sk: 'user' },
        TableName,
      })
      .promise();
    expect(results.Item.Item.attributes).toEqual('User: Eric');
  });

  it('get all users by section', async () => {
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SQLtoNoSQL.Indexes.QueryAndScan.html
    const results = await dynamoClient
      .query({
        ExpressionAttributeValues: {
          ':gsipk1': 'docketclerk',
        },
        IndexName: 'gsi1',
        KeyConditionExpression: 'gsipk1 = :gsipk1',
        TableName,
      })
      .promise();
    expect(results.Items.length).toEqual(2);
  });

  it('get case 101-19 by docketNumber', async () => {
    const results = await dynamoClient
      .query({
        ExpressionAttributeValues: { ':pk': '101-19', ':sk': 'case' },
        KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
        TableName,
      })
      .promise();
    expect(results.Items[0].Item.attributes).toEqual('Case: 101-19');
  });
});
