# Wiki Fetcher

This app allows a user to search for the most viewed wiki pages for a specific date. The user can select the day they wish to see reuslts for and decide how many results they wish to see. The articles are displayed by rank and show the number of times it was viewed that day.

Additionally, the user can pin articles, which remain visible at the top of each page and persist through reloads. The user can also click on an article to see a brief summary of the wiki article along with the top 3 most viewed days that month for the article.

## Local Development

To develop locally, clone the repo, install the dependencies and start up the dev server.

```bash
> git clone git@github.com:aahill50/wiki-fetcher.git
> cd wiki-fetcher
> npm install
> npm run dev
```

Navigate to `http://localhost:3000/` in your web browser to see the app running.

## Building for Deployment

```bash
> npm install
> npm run build
> npm run start
```

## Testing

Unit tests are written with Jest using React Testing Library for directly testing DOM elements. Simply run the command below to run all tests

```bash
> npm run test
```

## Endpoints

This app uses 3 different endpoints to aggregate data:

### PageviewsByDay

Returns page views for the top 1000 articles for the given day

**Endpoint**
`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-acesss/{year}/{month}/{day}`

**Params**

```ts
year: number;
month: number;
day: number;
```

### Summary

Returns a summary of the article specifed, including an extract about the article and a thumbnail

**Endpoint**
`https://en.wikipedia.org/api/rest_v1/page/summary/{articleTitle}`

**Params**

```
articleTitle: string;
```

### PageviewsByDayForArticle

Returns pageviews for the given article over the specified time range

**Endpoint**
`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/{articleTitle}/daily/{startDay}/{endDay}`

**Params**

```ts
articleTitle: string;
startDay: string; // YYYYMMDD format
endDay: string; // YYYYMMDD format
```

## Local Development

To develop locally, clone the repo, install the dependencies and start up the dev server.

```bash
> git clone git@github.com:aahill50/wiki-fetcher.git
> npm install
> npm run dev
```

Navigate to `http://localhost:3000/` in your web browser to see the app running.

## Building for Deployment

```bash
> npm install
> npm run build
> npm run start
```

## Testing

Unit tests are written with Jest using React Testing Library for directly testing DOM elements. Simply run the command below to run all tests

```bash
> npm run test
```

## Built With

-   [react](https://react.dev/reference/react)
-   [Next.js](https://nextjs.org/docs)'
-   [Typescript](https://www.typescriptlang.org/docs/)
-   [Tailwind CSS](https://tailwindcss.com/docs/)
-   [zustand](https://github.com/pmndrs/zustand#readme) (State Management)
-   [Jest](https://jestjs.io/docs/api)
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
-   [ESLint](https://eslint.org/docs/latest/)
