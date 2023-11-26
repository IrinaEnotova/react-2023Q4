import { HttpResponse, delay, http } from 'msw';
import { BASE_PATH, LIMIT, PAGINATION, SEARCH_PATH } from '../../API/constants';
import { mockItems } from './mockItems';

export const handlers = [
  http.get(`${BASE_PATH}?${SEARCH_PATH}=//i&${PAGINATION}=1&${LIMIT}=12`, async () => {
    await delay(150);
    return HttpResponse.json({
      docs: mockItems,
      total: 933,
      limit: 12,
      page: 1,
      pages: 78,
    });
  }),

  http.get(`${BASE_PATH}/5cd99d4bde30eff6ebccfc62`, async () => {
    await delay(150);
    return HttpResponse.json({
      docs: [
        {
          _id: '5cd99d4bde30eff6ebccfc62',
          height: '',
          race: 'Hobbit',
          gender: 'Female',
          birth: 'TA 2818',
          spouse: 'Marmadoc Brandybuck',
          death: '',
          realm: '',
          hair: '',
          name: 'Adaldrida (Bolger) Brandybuck',
          wikiUrl: 'http://lotr.wikia.com//wiki/Adaldrida_(Bolger)_Brandybuck',
        },
      ],
      total: 1,
      limit: 12,
      page: 1,
      pages: 1,
    });
  }),
];
