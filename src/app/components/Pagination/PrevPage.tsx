import { useStore } from '~/store';
import Icon from '../Icon';
import iconChevronLeft from '../../../assets/icon_chevron_left.svg';
import classes from '../classes';

interface Props {
    onClick: (pageNumber: number) => void;
}

export default function PrevPage(props: Props) {
    const { onClick } = props;
    const articles = useStore((state) => state.articles);
    const page = useStore((state) => state.page);
    const hasArticles = articles.length > 0;
    const hasPrevPage = page > 1;

    return !hasArticles ? null : (
        <div
            className='mr-6 cursor-pointer'
            onClick={() => onClick(Math.max(page - 1, 1))}
        >
            <div className={classes.prevPage({ hasPrevPage })}>
                <Icon
                    alt='prev-page'
                    height={20}
                    width={20}
                    svg={iconChevronLeft}
                />
            </div>
        </div>
    );
}
