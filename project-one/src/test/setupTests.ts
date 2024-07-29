// src/test/setupTests.ts
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.get('https://rickandmortyapi.com/api/character', (_req, res, ctx) => {
    return res(
      ctx.json({
        info: { pages: 2 },
        results: [{ id: 1, name: 'Rick Sanchez' }],
      }),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server, rest };
