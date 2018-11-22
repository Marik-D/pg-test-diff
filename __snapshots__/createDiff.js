exports['createDiff One dst table Works for empty table 1'] = []

exports['createDiff One dst table Works for one record 1'] = [
  {
    "type": "ADD",
    "table": "foo",
    "data": {
      "id": 1,
      "key": "val",
      "date": "1970-01-01T00:00:00.000Z"
    }
  }
]

exports['createDiff One dst table Works for two records 1'] = [
  {
    "type": "ADD",
    "table": "foo",
    "data": {
      "id": 1,
      "key": "val1",
      "date": "1970-01-01T00:00:00.000Z"
    }
  },
  {
    "type": "ADD",
    "table": "foo",
    "data": {
      "id": 2,
      "key": "val2",
      "date": "1970-01-01T00:00:00.000Z"
    }
  }
]

exports['createDiff One src table Works for empty table 1'] = []

exports['createDiff One src table Works for one record 1'] = [
  {
    "type": "DEL",
    "table": "foo",
    "data": {
      "id": 1,
      "key": "val",
      "date": "1970-01-01T00:00:00.000Z"
    }
  }
]

exports['createDiff One src table Works for two records 1'] = [
  {
    "type": "DEL",
    "table": "foo",
    "data": {
      "id": 1,
      "key": "val1",
      "date": "1970-01-01T00:00:00.000Z"
    }
  },
  {
    "type": "DEL",
    "table": "foo",
    "data": {
      "id": 2,
      "key": "val2",
      "date": "1970-01-01T00:00:00.000Z"
    }
  }
]

exports['createDiff One table Works for empty table 1'] = []

exports['createDiff One table Works for one record 1'] = [
  {
    "type": "MOD",
    "table": "foo",
    "data": {
      "id": [
        1
      ],
      "key": [
        "foo",
        "bar"
      ],
      "date": [
        "1970-01-01T00:00:00.000Z",
        "1970-01-01T00:16:40.000Z"
      ]
    }
  }
]

exports['createDiff One table Works for two records 1'] = [
  {
    "type": "DEL",
    "table": "foo",
    "data": {
      "id": 1,
      "key": "val1",
      "date": "1970-01-01T00:00:00.000Z"
    }
  },
  {
    "type": "MOD",
    "table": "foo",
    "data": {
      "id": [
        2
      ],
      "key": [
        "val2",
        "val1"
      ],
      "date": [
        "1970-01-01T00:00:00.000Z"
      ]
    }
  },
  {
    "type": "ADD",
    "table": "foo",
    "data": {
      "id": 3,
      "key": "val2",
      "date": "1970-01-01T00:00:00.000Z"
    }
  }
]

exports['createDiff Works for empty snapshots 1'] = []
