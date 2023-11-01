'use client';

import { useCallback, useEffect, useState } from 'react';
import { useStore } from '~/store';
import api from '~/api';
import { getArticlesForPage } from '~/utilities';
import Article from '../Article';
import classes from '../classes';
import { type SummaryResponse } from '~/api';
import { type Article as Type_Article } from '~/types';

export default function Results() {
    const articles = useStore((state) => state.articles);
    const page = useStore((state) => state.page);
    const pageSize = useStore((state) => state.pageSize);
    const selectedMonth = useStore((state) => state.selectedMonth);
    const selectedYear = useStore((state) => state.selectedYear);
    const [pinnedArticles, setPinnedArticles] = useState<
        Record<string, Type_Article>
    >({});
    const [activeArticle, setActiveArticle] = useState<Type_Article | null>(
        null
    );
    const [articleDetails, setArticleDetails] =
        useState<SummaryResponse | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [fetchError, setFetchError] = useState<Error | null>(null);
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
        api.summary({
            article: articleTitle,
            month: selectedMonth,
            year: selectedYear,
        })
            .then((res) => {
                setFetchError(null);
                setArticleDetails(res);
            })
            .catch((e: Error) => {
                setFetchError(e);
            });
    }, [activeArticle, setArticleDetails, selectedMonth, selectedYear]);

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

    const errorComponent = (
        <div className={classes.results}>
            <div>An error has occurred, please try again.</div>
            <pre className='bg- px-4 py-1 rounded-md text-sm bg-red-50 border'>
                {fetchError?.toString()}
            </pre>
        </div>
    );

    return fetchError ? (
        errorComponent
    ) : (
        <>
            {!hasPinnedArticles ? null : (
                <div className={classes.results}>
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
                <div className={classes.results}>
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
