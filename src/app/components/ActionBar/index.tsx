import DatePicker from './DatePicker';
import NumResults from './NumResults';
import SearchButton from './SearchButton';
import classes from '../classes';

export default function ActionBar() {
    const divider = (
        <div className='hidden sm:block w-px sm:bg-gray-200 mx-4'></div>
    );

    return (
        <div className={classes.actionBar}>
            <DatePicker />
            {divider}
            <NumResults />
            <SearchButton />
        </div>
    );
}
