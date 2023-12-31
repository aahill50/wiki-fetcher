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
    it('should return a Map of calendar months', () => {
        const calendarMonths = getCalendarMonths();

        expect(calendarMonths).toBeInstanceOf(Map);
    });

    it.each([
        { month: 'April 2015' },
        { month: 'May 2015' },
        { month: 'June 2023' },
        { month: 'October 2023' },
    ])('"$month" should be a valid key', ({ month }) => {
        const calendarMonths = getCalendarMonths();

        expect(calendarMonths.get(month)).toBeDefined();
    });

    it.each([
        { month: 'March 2015', expectation: 'not valid' },
        { month: 'January 2055', expectation: 'not valid' },
    ])('"$month" should not be a valid key', ({ month }) => {
        const calendarMonths = getCalendarMonths();
        expect(calendarMonths.get(month)).toBeUndefined();
    });
});
