'use client';

import { useCallback, useEffect, useState } from 'react';
import { useStore } from '~/store';
import api, { SummaryResponse } from '~/api';
import { getArticlesForPage } from '~/utilities';
import Article from '../Article';
import { type Article as Type_Article } from '~/types';

export default function Results() {
    const articles = useStore((state) => state.articles);
    const page = useStore((state) => state.page);
    const pageSize = useStore((state) => state.pageSize);
    const [pinnedArticles, setPinnedArticles] = useState<
        Record<string, Type_Article>
    >({});
    const [activeArticle, setActiveArticle] = useState<Type_Article | null>(
        null
    );
    const [articleDetails, setArticleDetails] =
        useState<SummaryResponse | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const filteredArticles = getArticlesForPage({ articles, page, pageSize });

    useEffect(() => {
        setPinnedArticles(
            JSON.parse(
                localStorage.getItem('pinnedArticles') || '{}'
            ) as Record<string, Type_Article>
        );
    }, [setPinnedArticles]);

    useEffect(() => {
        const articleTitle = activeArticle?.originalTitle || '';
        api.getSummary({
            article: articleTitle,
        })
            .then((res) => {
                setArticleDetails(res);
            })
            .catch((e) => {
                console.log('e:', e);
            });
    }, [activeArticle, setArticleDetails]);

    const onClickArticle = useCallback(
        (article: Type_Article) => {
            const show = activeArticle === article ? !showDetails : true;
            setShowDetails(show);
            setActiveArticle(article);
        },
        [activeArticle, setActiveArticle, showDetails]
    );

    const onClickPinArticle = useCallback((article: Type_Article) => {
        const currentPinnedArticles: Record<string, Type_Article> = JSON.parse(
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

    const hasPinnedArticles = Object.keys(pinnedArticles).length > 0;
    const hasArticles = filteredArticles.length > 0;

    return (
        <>
            {!hasPinnedArticles ? null : (
                <div className='flex flex-col gap-4 p-6 mt-6 bg-white sm:rounded-2xl shadow-[0_2px_0_1px_rgba(5,9,12,0.06)]'>
                    {Object.keys(pinnedArticles).map((key, index) => (
                        <Article
                            key={`pinned-article-${index + 1}`}
                            article={pinnedArticles[key]}
                            articleDetails={articleDetails}
                            pinnedArticles={pinnedArticles}
                            showDetails={showDetails}
                            onClickArticle={onClickArticle}
                            onClickPinArticle={onClickPinArticle}
                            showRank={false}
                        />
                    ))}
                </div>
            )}
            {!hasArticles ? null : (
                <div className='flex flex-col gap-4 p-6 mt-6 bg-white sm:rounded-2xl shadow-[0_2px_0_1px_rgba(5,9,12,0.06)]'>
                    {filteredArticles?.map((article, index) => (
                        <Article
                            key={`article-${index + 1}`}
                            article={article}
                            articleDetails={articleDetails}
                            pinnedArticles={pinnedArticles}
                            showDetails={showDetails}
                            onClickArticle={onClickArticle}
                            onClickPinArticle={onClickPinArticle}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
