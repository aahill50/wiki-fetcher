import clsx from 'clsx';

const classes = {
    article: ({ canShowDetails }: { canShowDetails: boolean }) =>
        clsx(
            'flex',
            'flex-col',
            'p-4',
            'border',
            'border-gray-200',
            'rounded-xl',
            {
                'cursor-pointer': canShowDetails,
            }
        ),
};

export default classes;
