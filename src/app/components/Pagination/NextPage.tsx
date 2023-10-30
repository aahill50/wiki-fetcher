import Icon from '../Icon';
import iconChevronRight from '../../../assets/icon_chevron_right.svg';
import { useStore } from '~/store';
import { getAllPageNumbers, getNumPages } from '~/utilities';
import clsx from 'clsx';

interface Props {
    onClick: (pageNumber: number) => void;
}

export default function NextPage(props: Props) {
    const { onClick } = props;
    const articles = useStore((state) => state.articles);
    const page = useStore((state) => state.page);
    const pageSize = useStore((state) => state.pageSize);
    const numPages = getNumPages(articles.length, pageSize);
    const allPages = getAllPageNumbers(articles, pageSize)
    const hasArticles = articles.length > 0;
    const hasNextPage = page <= allPages.length - 1;

    return !hasArticles ? null : (
        <div
            className='ml-6 cursor-pointer'
            onClick={() => onClick(Math.min(page + 1, numPages))}
        >
            <div
                className={clsx(
                    'w-10',
                    'h-10',
                    'rounded-full',
                    'text-sm',
                    'font-poppins',
                    'font-normal',
                    'text-center',
                    'align-middle',
                    'border-neutral-400',
                    'inline-flex',
                    'items-center',
                    'place-content-center',
                    {
                        'bg-white': hasNextPage,
                        'bg-neutral-400': !hasNextPage,
                        'border-0': hasNextPage,
                        border: !hasNextPage,
                        'cursor-pointer': hasNextPage,
                        'cursor-default': !hasNextPage,
                    }
                )}
            >
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
