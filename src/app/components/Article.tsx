import classes from './classes';
import Icon from './Icon';
import ArticleDetails from './ArticleDetails';
import { prettyNumbers } from '~/utilities';
import iconPinEmpty from '~/assets/icon_pin_empty.svg';
import iconPinFilled from '~/assets/icon_pin_filled.svg';
import { type Article } from '~/types';
import { type StaticImport } from 'next/dist/shared/lib/get-img-props';
import { type SummaryResponse } from '~/api';

interface Props {
    article: Article;
    articleDetails: SummaryResponse | null;
    pinnedArticles: Record<string, Article>;
    showDetails: boolean;
    showRank?: boolean;
    onClickArticle: (article: Article) => void;
    onClickPinArticle: (article: Article) => void;
}
export default function Article(props: Props) {
    const {
        article,
        articleDetails,
        pinnedArticles,
        showDetails,
        showRank,
        onClickArticle,
        onClickPinArticle,
    } = props;

    const canShowDetails =
        articleDetails?.originalTitle === article.originalTitle &&
        !!articleDetails?.extract;

    const getPinIcon = (article: Article): StaticImport =>
        pinnedArticles[article.key]
            ? (iconPinFilled as StaticImport)
            : (iconPinEmpty as StaticImport);

    return (
        <div
            className={classes.article({
                canShowDetails,
            })}
        >
            <div
                key={article.article}
                className='flex gap-5'
                onClick={() => onClickArticle(article)}
            >
                {showRank === false ? null : (
                    <div className='font-lora text-base w-5 shrink-0 mr-3 text-neutral-400 font-normal'>
                        {article.rank}
                    </div>
                )}
                <div className='font-lora text-base grow mr-4 text-black font-medium cursor-pointer'>
                    {article.article}
                </div>
                <div className='font-poppins text-sm shrink-0 text-neutral-500  font-normal'>
                    {prettyNumbers(article.views)} views
                </div>
                <div
                    className='cursor-pointer shrink-0'
                    onClick={(e) => {
                        e.stopPropagation();
                        onClickPinArticle(article);
                    }}
                >
                    <Icon
                        svg={getPinIcon(article)}
                        width={12}
                        height={16}
                        alt='pin-article'
                    />
                </div>
            </div>
            <ArticleDetails
                article={article}
                articleDetails={articleDetails}
                showDetails={showDetails}
            />
        </div>
    );
}
