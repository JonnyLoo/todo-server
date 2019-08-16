const supertest = require('supertest');
const express = require('express');
const controller = require('controller');
const router = require('../../routes');

// spy on controller handler function
const getListSpy = jest.spyOn(controller, 'getList').mockImplementation((req, res) => {
  return res.status(200).end();
});

// setup app
const app = express();
app.get('/api/item/', controller.getList);
app.use('/api/item', router);
const request = supertest(app);

// just test one route and that the correct handler is called
describe('Router', () => {
  it('calls getList when GET /api/item/ request is made', () => {
    request.get('/api/item/')
      .expect(200)
      .end(() => {
        expect(getListSpy).toHaveBeenCalledTimes(1);
      });
  });
});
