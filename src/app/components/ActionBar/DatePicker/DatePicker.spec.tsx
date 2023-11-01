import { render, screen } from '@testing-library/react';
import DatePicker from './';
import { mockState } from '~/testUtilities';
import { MONTHS } from '~/constants';

describe('DatePicker', () => {
    it('should render the calendar icon', () => {
        render(<DatePicker />);
        expect(screen.getByAltText('calendar-icon')).toBeInTheDocument();
    });

    it('should render the dropdown menu label', () => {
        render(<DatePicker />);
        expect(
            screen.getByText('DATE', { selector: '.visible' })
        ).toBeInTheDocument();
    });

    it('should display the current selected date', () => {
        const {
            selectedDay: day,
            selectedMonth: month,
            selectedYear: year,
        } = mockState;
        const expectedDate = `${MONTHS[month]} ${day}, ${year}`;

        render(<DatePicker />);
        expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });

    it('should render the calendar with height 0 by default', () => {
        render(<DatePicker />);
        const calendar = screen.getByRole('document', { name: 'calendar' });

        expect(calendar).toBeInTheDocument();
        expect(calendar).toHaveClass('h-0');
    });
});
