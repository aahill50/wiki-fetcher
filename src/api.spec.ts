import {
    padLeft,
    articleSummary,
    pageviewsByDay,
    pageviewsByDayPerCountry,
} from './api';
import { ENDPOINT_SEGMENT } from './constants';

describe('padLeft', () => {
    it.each([
        { value: '0', expected: '00' },
        { value: '2', expected: '02' },
        { value: '11', expected: '11' },
        { value: '999', expected: '999' },
    ])('should convert $value to $expected', ({ value, expected }) => {
        const val = padLeft(value);
        expect(val).toContain(expected);
    });
});

describe('articleSummary', () => {
    it('should return the correct endpoint', () => {
        const endpoint = articleSummary({ article: 'Test_1' });
        expect(endpoint).toContain(ENDPOINT_SEGMENT.summary);
    });
});

describe('pageviewsByDay', () => {
    it('should return the correct endpoint', () => {
        const endpoint = pageviewsByDay({
            access: 'all-access',
            day: 1,
            month: 1,
            project: 'en.wikipedia',
            year: 2023,
        });
        expect(endpoint).toContain(ENDPOINT_SEGMENT.pageviewsByDay);
    });
});

describe('pageviewsByDayPerCountry', () => {
    it('should return the correct endpoint', () => {
        const endpoint = pageviewsByDayPerCountry({
            access: 'all-access',
            country: 'US',
            day: 1,
            month: 1,
            year: 2023,
        });
        expect(endpoint).toContain(ENDPOINT_SEGMENT.pageviewsByDayPerCountry);
    });
});
