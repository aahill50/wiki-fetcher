import { render, screen } from '@testing-library/react';
import Pagination from './';
import { NUM_PAGES_TO_DISPLAY } from '~/constants';

describe('Pagination', () => {
    it(`should render no more than ${NUM_PAGES_TO_DISPLAY} pages`, () => {
        render(<Pagination />);

        expect(screen.getByText(1)).toBeInTheDocument();
        expect(screen.getByText(2)).toBeInTheDocument();
        expect(screen.getByText(3)).toBeInTheDocument();
        expect(screen.getByText(4)).toBeInTheDocument();
        expect(screen.queryByText(5)).not.toBeInTheDocument();
    });

    it('should render a prev page arrow', () => {
        render(<Pagination />);
        expect(screen.getByAltText('prev-page')).toBeInTheDocument();
    });

    it('should render a next page arrow', () => {
        render(<Pagination />);
        expect(screen.getByAltText('next-page')).toBeInTheDocument();
    });
});
