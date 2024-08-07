import { http, HttpResponse } from 'msw';
import characters from './characters.json';
import characterDetail from './characterDetail.json';

export const handlers = [
  // Intercept the request for characters list
  http.get('https://rickandmortyapi.com/api/character', () => {
    return HttpResponse.json(characters);
  }),
  // Intercept the request for character detail
  http.get('https://rickandmortyapi.com/api/character/:id', () => {
    return HttpResponse.json(characterDetail);
  }),
  // Intercept the request for characters list with error
  http.get('https://rickandmortyapi.com/api/character', () => {
    return HttpResponse.json(null, { status: 500 });
  }),
];
