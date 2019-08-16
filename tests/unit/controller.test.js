const nock = require('nock');
const controller = require('controller');

// unit test for the route handlers
describe('getList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should return the correct response when 200', () => {
    // sample expected response
    const GET_LIST_RESPONSE = {
      success: true,
      todoList: {
        name: 'Todo List',
        items: []
      }
    }
    // sample response from the database
    const DB_RESPONSE = {
      _id: 1,
      name: 'Todo List',
      items: []
    }

    // build request object
    // in this case there's nothing needed in the request
    // can set headers, params or whatever's needed here
    const req = {};
    // build response object
    const res = {
      status: (statusCode) => {
        expect(statusCode).toBe(200);
      },
      json: (data) => {
        expect(data).toMatchObject(GET_LIST_RESPONSE);
      }
    };

    // mock response
    nock('http://localhost:3001/api/item')
      .get('/')
      .reply(200, DB_RESPONSE);

    controller.getList(req, res);
  });
});
