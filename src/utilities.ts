import { NUM_PAGES_TO_DISPLAY } from './constants';
import { Article } from './types';

export const formatArticles = (
    articles: Article[],
    numResults: number
): Article[] => {
    return articles.slice(0, numResults).map((el) => {
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
