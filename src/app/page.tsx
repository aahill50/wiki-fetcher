import Results from './components/Results';
import ActionBar from './components/ActionBar';
import Title from './components/Title';
import Pagination from './components/ActionBar/Pagination';

export default function Home() {
    return (
        <>
            <Title />
            <ActionBar />
            <Results />
            <Pagination />
        </>
    );
}
