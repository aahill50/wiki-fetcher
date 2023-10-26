import { Article } from './types';
import { formatArticles, getArticlesForPage, prettyNumbers } from './utilities';

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
        const formattedArticles = formatArticles(mockArticles);

        expect(formattedArticles[0].article).toBe('Test Article 1');
        expect(formattedArticles[1].article).toBe('Test Article 2');
    });

    it('should work when there are no "_" to replace', () => {
        const mockArticles: Article[] = [
            { article: 'Test', rank: 1, views: 1000 },
        ];
        const formattedArticles = formatArticles(mockArticles);

        expect(formattedArticles[0].article).toBe('Test');
    });
});

describe('getArticlesForPage', () => {
    const mockArticles: Article[] = Array(20)
        .fill(0)
        .map((_, n) => ({
            article: `Test-${n + 1}`,
            rank: n + 1,
            views: 1000 - n,
        }));

    test.each([
        {
            i: 0,
            j: 9,
            page: 1,
            pageSize: 10,
            firstArticle: 'Test-1',
            lastArticle: 'Test-10',
        },
        {
            i: 10,
            j: 19,
            page: 2,
            pageSize: 10,
            firstArticle: 'Test-11',
            lastArticle: 'Test-20',
        },
    ])(
        'should return $pageSize articles (indices $i through $j) for page $page',
        ({ i, j, page, pageSize, firstArticle, lastArticle }) => {
            const pageArticles = getArticlesForPage({
                articles: mockArticles,
                page,
                pageSize,
            });
            expect(pageArticles.length).toEqual(pageSize);
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

        expect(pageArticles.length).toEqual(5);
        expect(pageArticles[0].article).toEqual('Test-16');
        expect(pageArticles[pageArticles.length - 1].article).toEqual(
            'Test-20'
        );
    });

    it(`should return no articles if there aren't enough articles to satisfy the page and pageSize condiditons`, () => {
        // mockArticles only has 20 elements
        // if pageSize = 15, page 3 shouldn't have any articles
        const pageArticles = getArticlesForPage({
            articles: mockArticles,
            page: 3,
            pageSize: 15,
        });

        expect(pageArticles.length).toEqual(0);
        expect(pageArticles.length).toEqual(0);
    });
});
