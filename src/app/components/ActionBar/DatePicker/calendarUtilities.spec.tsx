import { getDiffInDays, getCalendarMonths } from './calendarUtilities';

describe('getDiffInDays', () => {
    it.each([
        {
            date1: new Date('1/1/2023'),
            date2: new Date('2/1/2023'),
            expected: 31,
            abstract: 'when date1 is before date2',
        },
        {
            date1: new Date('2/1/2023'),
            date2: new Date('1/1/2023'),
            expected: 31,
            abstract: 'when date1 is after date2',
        },
        {
            date1: new Date('1/1/2023'),
            date2: new Date('1/1/2024'),
            expected: 365,
            abstract: 'when calculating a full year',
        },
        {
            date1: new Date('1/1/2020'),
            date2: new Date('1/1/2021'),
            expected: 366,
            abstract: 'when dealing with a leap year',
        },
    ])(
        'should return $expected as the difference between $date1 and $date2 $abstract',
        ({ date1, date2, expected }) => {
            expect(getDiffInDays(date1, date2)).toEqual(expected);
        }
    );
});

describe('getCalendarMonths', () => {
    it.each([
        { month: 'March 2015', expectation: 'not valid' },
        { month: 'April 2015', expectation: 'valid' },
        { month: 'May 2015', expectation: 'valid' },
        { month: 'June 2023', expectation: 'valid' },
        { month: 'October 2023', expectation: 'valid' },
        { month: 'January 2055', expectation: 'not valid' },
    ])(
        'should return a Map of calendar months for all valid months. Expect $month to be $expectation',
        ({ month, expectation }) => {
            const calendarMonths = getCalendarMonths();

            expect(calendarMonths).toBeInstanceOf(Map);

            if (expectation === 'valid') {
                expect(calendarMonths.get(month)).toBeDefined();
            } else {
                expect(calendarMonths.get(month)).toBeUndefined();
            }
        }
    );
});
