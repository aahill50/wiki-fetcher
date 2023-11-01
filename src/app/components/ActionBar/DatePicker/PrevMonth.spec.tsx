import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrevMonth from './PrevMonth';
import { mockState } from '~/testUtilities';

describe('PrevMonth', () => {
    it('should render', () => {
        render(<PrevMonth disabled={false} />);
        expect(
            screen.getByRole('button', { name: 'prev-month' })
        ).toBeInTheDocument();
    });

    it('should select the prev month when clicked', async () => {
        const user = userEvent.setup();
        const { selectedMonth, selectMonth } = mockState;
        expect(selectedMonth).toBe(1);
        render(<PrevMonth disabled={false} />);
        await user.click(screen.getByRole('button', { name: 'prev-month' }));
        expect(selectMonth).toHaveBeenCalledWith(12);
    });
});
