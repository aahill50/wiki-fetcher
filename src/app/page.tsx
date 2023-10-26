import Results from './components/Results';
import ActionBar from './components/ActionBar';
import Title from './components/Title';
import Pagination from './components/ActionBar/Pagination';

export default function Home() {
    return (
        <div className='min-w-[328px] sm:max-w-[800px] sm:mx-auto'>
            <Title />
            <ActionBar />
            <Results />
            <Pagination />
        </div>
    );
}
