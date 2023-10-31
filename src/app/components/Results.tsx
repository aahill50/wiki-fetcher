'use client';

import { useCallback, useEffect, useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useStore } from '~/store';
import Icon from './Icon';
import { getArticlesForPage, prettyNumbers } from '~/utilities';
import iconPinEmpty from '~/assets/icon_pin_empty.svg';
import iconPinFilled from '~/assets/icon_pin_filled.svg';
import { Article } from '~/types';
import api, { SummaryResponse } from '~/api';
import clsx from 'clsx';
import Image from 'next/image';

export default function Results() {
    const articles = useStore((state) => state.articles);
    const page = useStore((state) => state.page);
    const pageSize = useStore((state) => state.pageSize);
    const [pinnedArticles, setPinnedArticles] = useState<
        Record<string, Article>
    >({});
    const [articleDetails, setArticleDetails] =
        useState<SummaryResponse | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const filteredArticles = getArticlesForPage({ articles, page, pageSize });

    useEffect(() => {
        setPinnedArticles(
            JSON.parse(
                localStorage.getItem('pinnedArticles') || '{}'
            ) as Record<string, Article>
        );
    }, [setPinnedArticles]);

    const onClickArticle = useCallback(
        async (article: Article) => {
            setShowDetails(!showDetails);
            const isActiveArticle =
                articleDetails?.originalTitle === article.originalTitle;

            const res = isActiveArticle
                ? articleDetails
                : await api.getSummary({
                      article: article.originalTitle,
                  });
            setArticleDetails(res);
        },
        [articleDetails, showDetails]
    );

    const onClickPinArticle = useCallback((article: Article) => {
        const currentPinnedArticles: Record<string, Article> = JSON.parse(
            localStorage.getItem('pinnedArticles') || '{}'
        );

        if (currentPinnedArticles[article.key]) {
            delete currentPinnedArticles[article.key];
        } else {
            currentPinnedArticles[article.key] = article;
        }
        localStorage.setItem(
            'pinnedArticles',
            JSON.stringify(currentPinnedArticles)
        );
        setPinnedArticles(currentPinnedArticles);
    }, []);

    const getPinIcon = (article: Article): StaticImport =>
        pinnedArticles[article.key]
            ? (iconPinFilled as StaticImport)
            : (iconPinEmpty as StaticImport);

    const renderArticleDetails = (article: Article) => {
        const hasDetails = !!articleDetails?.extract;
        const hasImage = !!articleDetails?.thumbnail?.source;
        const isActiveArticle =
            articleDetails?.originalTitle === article.originalTitle;
        const showDetails = isActiveArticle && hasDetails;

        return !showDetails ? null : (
            <div className='flex mt-5'>
                {!hasImage ? null : (
                    <div className='max-w-[100px] h-fit'>
                        <Image
                            src={articleDetails?.thumbnail?.source}
                            alt={`${article.originalTitle}_thumbnail`}
                            width={articleDetails.thumbnail.width}
                            height={articleDetails.thumbnail.height}
                        />
                    </div>
                )}
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
    };

    interface RenderArticleOpts {
        showRank: boolean;
    }
    const renderArticle = (
        article: Article,
        renderOpts?: RenderArticleOpts
    ) => (
        <div
            className={clsx(
                'flex',
                'flex-col',
                'p-4',
                'border',
                'border-gray-200',
                'rounded-xl',
                {
                    'cursor-pointer':
                        articleDetails?.originalTitle ===
                            article.originalTitle && articleDetails?.extract,
                }
            )}
        >
            <div
                key={article.article}
                className='flex gap-5'
                onClick={() => void onClickArticle(article)}
            >
                {renderOpts?.showRank === false ? null : (
                    <div className='font-lora text-base w-5 shrink-0 mr-3 text-neutral-400 font-normal'>
                        {article.rank}
                    </div>
                )}
                <div className='font-lora text-base grow mr-4 text-black font-medium'>
                    {article.article}
                </div>
                <div className='font-poppins text-sm shrink-0 text-neutral-500  font-normal'>
                    {prettyNumbers(article.views)} views
                </div>
                <div
                    className='cursor-pointer'
                    onClick={() => onClickPinArticle(article)}
                >
                    <Icon
                        svg={getPinIcon(article)}
                        width={12}
                        height={16}
                        alt='pin-article'
                    />
                </div>
            </div>
            {renderArticleDetails(article)}
        </div>
    );

    const hasPinnedArticles = Object.keys(pinnedArticles).length > 0;
    const hasArticles = filteredArticles.length > 0;

    return (
        <>
            {!hasPinnedArticles ? null : (
                <div className='flex flex-col gap-4 p-6 mt-6 bg-white sm:rounded-2xl shadow-[0_2px_0_1px_rgba(5,9,12,0.06)]'>
                    {Object.keys(pinnedArticles).map((key) =>
                        renderArticle(pinnedArticles[key], { showRank: false })
                    )}
                </div>
            )}
            {!hasArticles ? null : (
                <div className='flex flex-col gap-4 p-6 mt-6 bg-white sm:rounded-2xl shadow-[0_2px_0_1px_rgba(5,9,12,0.06)]'>
                    {filteredArticles?.map((article) => renderArticle(article))}
                </div>
            )}
        </>
    );
}
