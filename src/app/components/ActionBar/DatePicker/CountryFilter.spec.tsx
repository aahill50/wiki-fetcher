import { render, screen } from '@testing-library/react';
import CountryFilter from '../CountryFilter';
import { COUNTRY_CODES } from '~/constants';

describe('CountryFilter', () => {
    it('should render an option for every country stored in state', () => {
        const countriesCount = Object.keys(COUNTRY_CODES).length;
        render(<CountryFilter />);
        expect(screen.getAllByRole('option')).toHaveLength(countriesCount);
    });
});
