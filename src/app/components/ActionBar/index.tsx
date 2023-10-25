import DatePicker from './DatePicker';
import NumResults from './NumResults';
import SearchButton from './SearchButton';

export default function SearchBar() {
    return (
        <div className='flex flex-col sm:flex-row gap-4 bg-white p-6'>
            <DatePicker />
            <NumResults />
            <SearchButton />
        </div>
    );
}
