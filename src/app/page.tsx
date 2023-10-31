import Results from './components/Results';
import ActionBar from './components/ActionBar';
import Title from './components/Title';
import Pagination from './components/Pagination';

export default function Home() {
    return (
        <div className='min-w-[328px] lg:max-w-[960px] sm:mx-auto'>
            <Title />
            <ActionBar />
            <Results />
            <Pagination />
        </div>
    );
}
