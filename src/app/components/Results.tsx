'use client';

import { useCallback, useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useStore } from '~/store';
import Icon from './Icon';
import { getArticlesForPage, prettyNumbers } from '~/utilities';
import iconPinEmpty from '~/assets/icon_pin_empty.svg';
import iconPinFilled from '~/assets/icon_pin_filled.svg';
import { Article } from '~/types';

export default function Results() {
    const articles = useStore((state) => state.articles);
    const page = useStore((state) => state.page);
    const pageSize = useStore((state) => state.pageSize);
    const filteredArticles = getArticlesForPage({ articles, page, pageSize });
    const [pinnedArticles, setPinnedArticles] = useState<
        Record<string, Article>
    >(
        JSON.parse(localStorage.getItem('pinnedArticles') || '{}') as Record<
            string,
            Article
        >
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

    interface RenderArticleOpts {
        showRank: boolean;
    }
    const renderArticle = (
        article: Article,
        renderOpts?: RenderArticleOpts
    ) => (
        <div
            key={article.article}
            className='flex p-4 gap-5 border border-gray-200 rounded-xl'
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
    );

    return (
        <>
            <div className='flex flex-col gap-4 p-6 mt-6 bg-white sm:rounded-2xl shadow-[0_2px_0_1px_rgba(5,9,12,0.06)]'>
                {Object.keys(pinnedArticles).map((key) =>
                    renderArticle(pinnedArticles[key], { showRank: false })
                )}
            </div>
            <div className='flex flex-col gap-4 p-6 mt-6 bg-white sm:rounded-2xl shadow-[0_2px_0_1px_rgba(5,9,12,0.06)]'>
                {filteredArticles?.map((article) => renderArticle(article))}
            </div>
        </>
    );
}
