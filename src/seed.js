const users = [
  {
    Item: {
      attributes: 'User: Eric',
    },
    gsi1pk: 'docketclerk',
    gsi1sk: 'eric@example.com',
    pk: 'eric@example.com',
    sk: 'user',
  },
  {
    Item: {
      attributes: 'User: Kris',
    },
    gsi1pk: 'docketclerk',
    gsi1sk: 'kris@example.com',
    pk: 'kris@example.com',
    sk: 'user',
  },
];

const cases = [
  {
    Item: {
      attributes: 'Case: 101-19',
    },
    gsi1pk: 'eric@example.com',
    gsi1sk: 'case',
    pk: '101-19',
    sk: 'case|new',
  },
  {
    Item: {
      attributes: 'Case: 102-19',
    },
    gsi1pk: 'eric@example.com',
    gsi1sk: 'case',
    pk: '102-19',
    sk: 'case|new',
  },
  {
    Item: {
      attributes: 'Case: 103-19',
    },
    gsi1pk: 'kris@example.com',
    gsi1sk: 'case',
    pk: '103-19',
    sk: 'case|new',
  },
];

const workItems = [
  {
    Item: {
      attributes: 'WorkItem: 123456',
    },
    gsi1pk: 'eric@example.com',
    gsi1sk: 'workItem|open|123456',
    gsi2pk: 'docketclerk',
    gsi2sk: 'workItem|open|123456',
    gsi3pk: '101-19',
    gsi3sk: 'workItem|open|123456',
    pk: '123456',
    sk: 'workItem|open',
  },
  {
    Item: {
      attributes: 'WorkItem: 654321',
    },
    gsi1pk: 'kris@example.com',
    gsi1sk: 'workItem|open|654321',
    gsi2pk: 'docketclerk',
    gsi2sk: 'workItem|open|654321',
    gsi3pk: '101-19',
    gsi3sk: 'workItem|open|654321',
    pk: '654321',
    sk: 'workItem|open',
  },
];

module.exports = { cases, users, workItems };
