import Image from 'next/image';
import clsx from 'clsx';
import { prettyNumbers } from '~/utilities';
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
                    'max-h-[600px]': show,
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
                <div className='h-px w-full my-8 bg-neutral-400' />
                <div className='flex flex-col gap-4'>
                    <div className='font-poppins font-semibold text-xs leading-6 tracking-[0.01em] text-neutral-900'>
                        TOP VIEWS THIS MONTH
                    </div>
                    {articleDetails?.views.slice(0, 3).map((articleView, i) => {
                        return (
                            <div
                                className='flex justify-between'
                                key={`article-view-${i}`}
                            >
                                <div className='font-poppins font-normal text-sm leading-4 tracking-wide text-neutral-900'>
                                    {articleView.date}
                                </div>
                                <div className='font-poppins font-medium text-sm leading-4 text-marigold-500'>
                                    {prettyNumbers(articleView.views)} views
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
