import { ApiCallOpts, apiCall, getEndpoint } from './api';

global.fetch = jest.fn(
    () =>
        Promise.resolve({
            json: () => Promise.resolve({ items: [{ id: 1 }, { id: 2 }] }),
        }) as Promise<Response>
);

const mockApiCallOpts: ApiCallOpts = {
    access: 'all-access',
    country: 'US',
    day: 1,
    month: 1,
    year: 2023,
    project: 'en.wikipedia',
    endpointSegment: 'pageviewsByDay',
};

describe('apiCall', () => {
    it('should fetch data based on the endpointSement and return json', async () => {
        const res = await apiCall({ ...mockApiCallOpts });

        expect(res).toHaveProperty('items');
        expect(res.items).toHaveLength(2);
    });
});

type Segment = ApiCallOpts['endpointSegment'];
describe('getEndpoint', () => {
    it.each([
        {
            endpointSegment: 'pageviewByDay' as Segment,
            expected:
                'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2023/01/01',
        },
        {
            endpointSegment: 'pageviewsByDayPerCountry' as Segment,
            expected:
                'https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/US/all-access/2023/01/01',
        },
    ])(
        'should construct the right endpoint for segment: $endpointSegment',
        ({ endpointSegment, expected }) => {
            expect(
                getEndpoint({ ...mockApiCallOpts, endpointSegment })
            ).toEqual(expected);
        }
    );
});
