'use client';

import { useStore } from '~/store';
import { prettyNumbers } from '~/utilities';

export default function Results() {
    const articles = useStore((state) => state.articles);

    return (
        <div className='flex flex-col gap-4 p-6 mt-6 bg-white'>
            {articles?.map((article) => (
                <div className='flex p-4 gap-5 border border-gray-200 rounded-xl'>
                    <div className='font-lora text-base w-5 shrink-0 mr-3 text-neutral-400 font-normal'>
                        {article.rank}
                    </div>
                    <div className='font-lora text-base grow mr-4 text-black font-medium'>
                        {article.article}
                    </div>
                    <div className='font-poppins text-sm shrink-0 text-neutral-500  font-normal'>
                        {prettyNumbers(article.views)} views
                    </div>
                </div>
            ))}
        </div>
    );
}
