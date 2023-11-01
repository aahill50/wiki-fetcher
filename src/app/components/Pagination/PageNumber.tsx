import { useStore } from '~/store';
import classes from '../classes';

interface Props {
    pageNumber: number;
    onClick: (pageNumber: number) => void;
}

export default function PageNumber(props: Props) {
    const page = useStore((state) => state.page);
    const { pageNumber, onClick } = props;
    const isCurrentPage = pageNumber === page;

    return (
        <li
            key={pageNumber}
            onClick={() => onClick(pageNumber)}
            className={classes.pageNumber({ isCurrentPage })}
        >
            {pageNumber}
        </li>
    );
}
