import { client } from '../client';

describe('incorrect path', () => {
  test('responds with a 404 status code', async () => {
    const response = await client.get('/non-existent-path');

    expect(response.status).toEqual(404);
    expect(response.body).toMatchSnapshot();
  });
});
