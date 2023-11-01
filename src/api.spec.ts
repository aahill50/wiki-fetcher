import {
    padLeft,
    articleSummary,
    pageviewsByDay,
    pageviewsByDayForArticle,
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
        const endpoint = articleSummary({
            article: 'Test_1',
            month: 1,
            year: 2020,
        });
        expect(endpoint).toContain(ENDPOINT_SEGMENT.summary);
    });
});

describe('pageviewsByDay', () => {
    it('should return the correct endpoint', () => {
        const endpoint = pageviewsByDay({
            day: 1,
            month: 1,
            year: 2023,
        });
        expect(endpoint).toContain(ENDPOINT_SEGMENT.pageviewsByDay);
    });
});

describe('pageviewsByDayForArticle', () => {
    it('should return the correct endpoint', () => {
        const endpoint = pageviewsByDayForArticle({
            startDay: 1,
            endDay: 30,
            month: 1,
            year: 2023,
            article: 'TEST',
        });
        expect(endpoint).toContain(ENDPOINT_SEGMENT.pageviewsByDayForArticle);
    });
});
