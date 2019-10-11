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
    expect(items.Count).toEqual(7);
  });

  it('get user by email', async () => {
    const results = await dynamoClient
      .get({
        Key: { pk: 'eric@example.com', sk: 'user' },
        TableName,
      })
      .promise();
    expect(results.Item.Item.attributes).toEqual('User: Eric');
  });

  it('get users by section', async () => {
    const results = await dynamoClient
      .query({
        ExpressionAttributeValues: {
          ':gsi1pk': 'docketclerk',
        },
        IndexName: 'gsi1',
        KeyConditionExpression: 'gsi1pk = :gsi1pk',
        TableName,
      })
      .promise();
    expect(results.Items.length).toEqual(2);
  });

  it('get case by docketNumber', async () => {
    const results = await dynamoClient
      .query({
        ExpressionAttributeValues: { ':pk': '101-19', ':sk': 'case' },
        KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
        TableName,
      })
      .promise();
    expect(results.Items[0].Item.attributes).toEqual('Case: 101-19');
  });

  // TODO: cases can have multiple petitioners
  it('get cases by petititioner', async () => {
    const results = await dynamoClient
      .query({
        ExpressionAttributeValues: {
          ':gsi1pk': 'eric@example.com',
          ':gsi1sk': 'case',
        },
        IndexName: 'gsi1',
        KeyConditionExpression: 'gsi1pk = :gsi1pk and gsi1sk = :gsi1sk',
        TableName,
      })
      .promise();
    expect(results.Items.length).toEqual(2);
  });

  // TODO: cases can have multiple practitioners
  it('get cases by practitioner', async () => {
    expect(true).toEqual(false);
  });

  it('get workItem by ID', async () => {
    const results = await dynamoClient
      .get({
        Key: { pk: '123456', sk: 'workItem|open' },
        TableName,
      })
      .promise();
    expect(results.Item.Item.attributes).toEqual('WorkItem: 123456');
  });

  it('get workItems by user', async () => {
    const results = await dynamoClient
      .query({
        ExpressionAttributeValues: {
          ':gsi1pk': 'eric@example.com',
          ':gsi1sk': 'workItem',
        },
        IndexName: 'gsi1',
        KeyConditionExpression:
          'gsi1pk = :gsi1pk and begins_with(gsi1sk, :gsi1sk)',
        TableName,
      })
      .promise();
    expect(results.Items.length).toEqual(1);
  });

  it('get workItems by section', async () => {
    const results = await dynamoClient
      .query({
        ExpressionAttributeValues: {
          ':gsi2pk': 'docketclerk',
          ':gsi2sk': 'workItem',
        },
        IndexName: 'gsi2',
        KeyConditionExpression:
          'gsi2pk = :gsi2pk and begins_with(gsi2sk, :gsi2sk)',
        TableName,
      })
      .promise();
    expect(results.Items.length).toEqual(2);
  });

  // it('get trialSession by ID', async () => {
  //   expect(true).toEqual(false);
  // });
  //
  // it('get trialSessions by judge', async () => {
  //   expect(true).toEqual(false);
  // });
  //
  // it('get trialSessions by sesionType', async () => {
  //   expect(true).toEqual(false);
  // });
  //
  // it('get trialSessions by location', async () => {
  //   expect(true).toEqual(false);
  // });
  //
  // it('get note by trialSession and judge', async () => {
  //   expect(true).toEqual(false);
  // });
  //
  // it('get note by docketNumber and judge', async () => {
  //   expect(true).toEqual(false);
  // });
  //
  // it('get socketConnection by user', async () => {
  //   expect(true).toEqual(false);
  // });
  //
  // it('get caseDeadlines by docketNumber', async () => {
  //   expect(true).toEqual(false);
  // });
});
