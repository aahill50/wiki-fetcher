import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionBarMenu from './ActionBarMenu';

describe('ActionBarMenu', () => {
    it('should render an ActionBarMenu with the given values', async () => {
        const clickMock = jest.fn();
        render(
            <ActionBarMenu
                displayValue='TEST_VALUE'
                icon={'TEST_ICON'}
                isOpen={false}
                label='TEST_LABEL'
                onClick={clickMock}
            >
                <div>TEST CHILD</div>
            </ActionBarMenu>
        );

        expect(screen.getByText('TEST_VALUE')).toBeInTheDocument();
        expect(screen.getByText('TEST_ICON')).toBeInTheDocument();
        expect(screen.getByText('TEST_LABEL')).toBeInTheDocument();
        expect(clickMock).not.toHaveBeenCalled();

        await userEvent.click(screen.getByText('TEST_LABEL'));
        expect(clickMock).toHaveBeenCalled();
    });
});
