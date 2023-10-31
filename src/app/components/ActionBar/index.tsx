import DatePicker from './DatePicker';
import NumResults from './NumResults';
import CountryFilter from './CountryFilter';
import SearchButton from './SearchButton';

export default function SearchBar() {
    const divider = (
        <div className='hidden sm:block w-px sm:bg-gray-200 mx-4'></div>
    );
    return (
        <div className='flex flex-col relative sm:flex-row sm:max-h-24 bg-white p-6 sm:px-4 sm:py-3 shadow-[0_2px_0_1px_rgba(5,9,12,0.06)] sm:rounded-full sm:justify-between'>
            <DatePicker />
            {divider}
            <NumResults />
            {divider}
            <CountryFilter />
            <SearchButton />
        </div>
    );
}
