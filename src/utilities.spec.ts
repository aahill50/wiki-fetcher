import { Article } from './types';
import {
    formatArticles,
    getArticlesForPage,
    getDisplayPageNumbers,
    prettyNumbers,
} from './utilities';

const createMockArticles = (count: number): Article[] => {
    return Array(count)
        .fill(0)
        .map((_, n) => ({
            article: `Test-${n + 1}`,
            rank: n + 1,
            views: 1000 - n,
        }));
};

describe('prettyNumbers', () => {
    it('should convert a number to a string', () => {
        expect(typeof prettyNumbers(123)).toBe('string');
    });

    it('should add commas to long numbers', () => {
        expect(prettyNumbers(1234567890)).toBe('1,234,567,890');
    });
});

describe('formatArticles', () => {
    it('should replace any "_" in article names with " "', () => {
        const mockArticles: Article[] = [
            { article: 'Test_Article_1', rank: 1, views: 1000 },
            { article: 'Test_Article_2', rank: 2, views: 500 },
        ];
        const formattedArticles = formatArticles(mockArticles, 10);

        expect(formattedArticles[0].article).toBe('Test Article 1');
        expect(formattedArticles[1].article).toBe('Test Article 2');
    });

    it('should work when there are no "_" to replace', () => {
        const mockArticles: Article[] = [
            { article: 'Test', rank: 1, views: 1000 },
        ];
        const formattedArticles = formatArticles(mockArticles, 10);

        expect(formattedArticles[0].article).toBe('Test');
    });
});

describe('getArticlesForPage', () => {
    const mockArticles: Article[] = createMockArticles(20);

    test.each([
        {
            i: 0,
            j: 9,
            articleCount: 100,
            page: 1,
            pageSize: 10,
            firstArticle: 'Test-1',
            lastArticle: 'Test-10',
        },
        {
            i: 10,
            j: 19,
            articleCount: 100,
            page: 2,
            pageSize: 10,
            firstArticle: 'Test-11',
            lastArticle: 'Test-20',
        },
    ])(
        'should return $pageSize articles (indices $i through $j) for page $page',
        ({ page, pageSize, firstArticle, lastArticle }) => {
            const pageArticles = getArticlesForPage({
                articles: mockArticles,
                page,
                pageSize,
            });
            expect(pageArticles).toHaveLength(pageSize);
            expect(pageArticles[0].article).toEqual(firstArticle);
            expect(pageArticles[pageArticles.length - 1].article).toEqual(
                lastArticle
            );
        }
    );

    it(`should return as many articles as possible when there aren't enough left to display a full page`, () => {
        // mockArticles only has 20 elements
        // if pageSize = 15, page 2 should only contain 5 articles
        const pageArticles = getArticlesForPage({
            articles: mockArticles,
            page: 2,
            pageSize: 15,
        });

        expect(pageArticles).toHaveLength(5);
        expect(pageArticles[0].article).toBe('Test-16');
        expect(pageArticles[pageArticles.length - 1].article).toBe('Test-20');
    });

    it(`should return no articles if there aren't enough articles to satisfy the page and pageSize condiditons`, () => {
        // mockArticles only has 20 elements
        // if pageSize = 15, page 3 shouldn't have any articles
        const pageArticles = getArticlesForPage({
            articles: mockArticles,
            page: 3,
            pageSize: 15,
        });

        expect(pageArticles).toHaveLength(0);
        expect(pageArticles).toHaveLength(0);
    });
});

describe('getDisplayPageNumbers', () => {
    it.each([
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 1,
            pageSize: 10,
            expected: [1, 2, 3, 4],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 2,
            pageSize: 10,
            expected: [1, 2, 3, 4],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 3,
            pageSize: 10,
            expected: [1, 2, 3, 4],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 4,
            pageSize: 10,
            expected: [2, 3, 4, 5],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 5,
            pageSize: 10,
            expected: [3, 4, 5, 6],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 6,
            pageSize: 10,
            expected: [4, 5, 6, 7],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 7,
            pageSize: 10,
            expected: [5, 6, 7, 8],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 8,
            pageSize: 10,
            expected: [6, 7, 8, 9],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 9,
            pageSize: 10,
            expected: [7, 8, 9, 10],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 10,
            pageSize: 10,
            expected: [7, 8, 9, 10],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: 11,
            pageSize: 10,
            expected: [7, 8, 9, 10],
        },
        {
            mockArticles: createMockArticles(100),
            articleCount: 100,
            currentPage: -1,
            pageSize: 10,
            expected: [1, 2, 3, 4],
        },
    ])(
        'should return $expected when on page $currentPage of $articleCount articles',
        ({ mockArticles, currentPage, pageSize, expected }) => {
            expect(
                getDisplayPageNumbers({
                    articles: mockArticles,
                    pageSize,
                    currentPage,
                })
            ).toEqual(expected);
        }
    );
});
