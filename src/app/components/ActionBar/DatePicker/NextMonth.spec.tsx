import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NextMonth from './NextMonth';
import { mockState } from '~/testUtilities';

describe('NextMonth', () => {
    it('should render', () => {
        render(<NextMonth disabled={false} />);
        expect(
            screen.getByRole('button', { name: 'next-month' })
        ).toBeInTheDocument();
    });

    it('should select the next month when clicked', async () => {
        const user = userEvent.setup();
        const { selectedMonth, selectMonth } = mockState;
        expect(selectedMonth).toBe(1);
        render(<NextMonth disabled={false} />);
        await user.click(screen.getByRole('button', { name: 'next-month' }));
        expect(selectMonth).toHaveBeenCalledWith(2);
    });
});
