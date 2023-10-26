import { Article } from './types';

export const formatArticles = (articles: Article[]): Article[] => {
    return articles.map((el) => {
        const { article, rank, views } = el;
        return {
            article: article.replaceAll('_', ' '),
            rank,
            views,
        };
    });
};

export const prettyNumbers = (num: number) =>
    Intl.NumberFormat('en').format(num);

export const getArticlesForPage = ({
    articles,
    page,
    pageSize,
}: {
    articles: Article[];
    page: number;
    pageSize: number;
}): Article[] => {
    const startEndex = (page - 1) * pageSize;
    const endIndex = startEndex + pageSize;
    return articles.slice(startEndex, endIndex);
};
