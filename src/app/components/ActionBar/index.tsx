import DatePicker from './DatePicker';
import NumResults from './NumResults';
import SearchButton from './SearchButton';

export default function SearchBar() {
    return (
        <div className='flex flex-col sm:flex-row bg-white p-6 shadow-[0_2px_0_1px_rgba(5,9,12,0.06)]'>
            <DatePicker />
            <NumResults />
            <SearchButton />
        </div>
    );
}
