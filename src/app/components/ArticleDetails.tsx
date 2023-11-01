import Image from 'next/image';
import clsx from 'clsx';
import { type Article } from '~/types';
import { type SummaryResponse } from '~/api';

interface Props {
    article: Article;
    articleDetails: SummaryResponse | null;
    showDetails: boolean;
}

export default function ArticleDetails(props: Props) {
    const { article, articleDetails, showDetails } = props;

    const hasDetails = !!articleDetails?.extract;
    const hasImage = !!articleDetails?.thumbnail?.source;
    const isActiveArticle =
        articleDetails?.originalTitle === article.originalTitle;
    const show = showDetails && isActiveArticle && hasDetails;

    return (
        <div
            className={clsx(
                'flex',
                'mt-5',
                'overflow-hidden',
                'transition-height',
                {
                    'duration-0': !show,
                    'duration-500': show,
                    'max-h-0': !show,
                    'max-h-[200px]': show,
                }
            )}
        >
            <div
                className={clsx('max-w-[100px]', 'h-fit', { 'w-0': !hasImage })}
            >
                <Image
                    src={articleDetails?.thumbnail?.source || ''}
                    alt={`${article.originalTitle}_thumbnail`}
                    width={articleDetails?.thumbnail?.width}
                    height={articleDetails?.thumbnail?.height}
                />
            </div>
            <div
                className={clsx('flex', 'flex-col', {
                    'ml-[52px]': !hasImage,
                    'ml-4': hasImage,
                })}
            >
                <div className='mb-2'>{articleDetails?.description}</div>
                <div className='text-sm font-poppins font-normal text-neutral-600'>
                    {articleDetails?.extract}
                </div>
            </div>
        </div>
    );
}
