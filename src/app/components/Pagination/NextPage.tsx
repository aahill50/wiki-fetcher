import { useStore } from '~/store';
import Icon from '../Icon';
import { getAllPageNumbers, getNumPages } from '~/utilities';
import iconChevronRight from '../../../assets/icon_chevron_right.svg';
import classes from '../classes';

interface Props {
    onClick: (pageNumber: number) => void;
}

export default function NextPage(props: Props) {
    const { onClick } = props;
    const articles = useStore((state) => state.articles);
    const page = useStore((state) => state.page);
    const pageSize = useStore((state) => state.pageSize);
    const numPages = getNumPages(articles.length, pageSize);
    const allPages = getAllPageNumbers(articles, pageSize);
    const hasArticles = articles.length > 0;
    const hasNextPage = page <= allPages.length - 1;

    return !hasArticles ? null : (
        <div
            className='ml-6 cursor-pointer'
            onClick={() => onClick(Math.min(page + 1, numPages))}
        >
            <div className={classes.nextPage({ hasNextPage })}>
                <Icon
                    alt='next-page'
                    height={20}
                    width={20}
                    svg={iconChevronRight}
                />
            </div>
        </div>
    );
}
