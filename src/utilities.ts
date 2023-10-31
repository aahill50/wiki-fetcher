import { NUM_PAGES_TO_DISPLAY } from './constants';
import { type Article } from './types';

const articlesToExclude: Record<string, boolean> = {
    Main_Page: true,
    '404.php': true,
};

const articlesFilterFn = (article: Omit<Article, 'key'>): boolean => {
    const articleName = article.article;
    const isExcluded = !!articlesToExclude[articleName];
    const isSpecialArticle = articleName.slice(0, 8) === 'Special:';
    const isWikipediaArticle = articleName.slice(0, 10) === 'Wikipedia:';
    const isWikidataArticle = articleName.slice(0, 10) === 'Wikidata:';
    const isCommonsArticle = articleName.slice(0, 10) === 'Commons:';
    return !(
        isExcluded ||
        isSpecialArticle ||
        isWikipediaArticle ||
        isWikidataArticle ||
        isCommonsArticle
    );
};

interface BasicDate {
    day: number;
    month: number;
    year: number;
}

export const formatArticles = (
    articles: Omit<Article, 'key'>[],
    numResults: number,
    date: BasicDate
): Article[] => {
    return articles
        .filter(articlesFilterFn)
        .slice(0, numResults)
        .map((_article, i) => {
            const { article, originalTitle, views } = _article;
            return {
                article: article.replaceAll('_', ' '),
                originalTitle,
                rank: i + 1,
                views,
                key: `${article}-${date.month}/${date.day}/${date.year}`,
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

export const getNumPages = (articleCount: number, pageSize: number) =>
    Math.ceil(articleCount / pageSize);

export const getAllPageNumbers = (
    articles: Article[],
    pageSize: number
): number[] => {
    const numPages = getNumPages(articles.length, pageSize);
    return Array(numPages)
        .fill(0)
        .map((n, i) => i + 1);
};

export const getDisplayPageNumbers = ({
    articles,
    pageSize,
    currentPage,
}: {
    articles: Article[];
    pageSize: number;
    currentPage: number;
}): number[] => {
    const allPageNumbers = getAllPageNumbers(articles, pageSize);

    const currentIndex = currentPage - 1;

    if (currentIndex < 0) {
        return allPageNumbers.slice(0, NUM_PAGES_TO_DISPLAY);
    }

    if (currentIndex >= allPageNumbers.length - 1) {
        return allPageNumbers.slice(-NUM_PAGES_TO_DISPLAY);
    }

    if (allPageNumbers.length <= NUM_PAGES_TO_DISPLAY) {
        return allPageNumbers;
    }

    const displayPageNumbers: number[] = [currentIndex + 1];
    let leftIndex = currentIndex - 1;
    let rightIndex = currentIndex + 1;
    let canTravelLeft = !!allPageNumbers[leftIndex];
    let canTravelRight = !!allPageNumbers[rightIndex];

    const addPageNumToLeft = () => {
        displayPageNumbers.unshift(leftIndex + 1);
        leftIndex--;
        canTravelLeft = !!allPageNumbers[leftIndex];
    };

    const addPageNumToRight = () => {
        displayPageNumbers.push(rightIndex + 1);
        rightIndex++;
        canTravelRight = !!allPageNumbers[rightIndex];
    };

    const shouldAddPageNum = (canTravel: boolean) =>
        canTravel && displayPageNumbers.length < NUM_PAGES_TO_DISPLAY;

    while (shouldAddPageNum(true)) {
        if (shouldAddPageNum(!canTravelLeft)) {
            addPageNumToRight();
        }
        if (shouldAddPageNum(canTravelLeft)) {
            addPageNumToLeft();
        }
        if (shouldAddPageNum(!canTravelRight)) {
            addPageNumToLeft();
        }
        if (shouldAddPageNum(canTravelRight)) {
            addPageNumToRight();
        }
    }

    return displayPageNumbers;
};
