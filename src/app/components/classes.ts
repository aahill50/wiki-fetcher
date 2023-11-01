import clsx from 'clsx';
import { averta } from '~/fonts/fonts';

const classes = {
    actionBar: clsx(
        'flex',
        'flex-col',
        'relative',
        'sm:flex-row',
        'sm:max-h-24',
        'bg-white',
        'p-6',
        'sm:px-4',
        'sm:py-3',
        'shadow-[0_2px_0_1px_rgba(5,9,12,0.06)]',
        'sm:rounded-full',
        'sm:justify-between'
    ),
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
    calendar: ({ isOpen }: { isOpen: boolean }) =>
        clsx(
            'absolute',
            'flex',
            'flex-col',
            'sm:top-[88px]',
            'top-16',
            '-left-2',
            'w-[375px]',
            'bg-white',
            'rounded-3xl',
            'shadow-[0_4px_24px_0_rgba(0,0,0,0.12)]',
            'font-poppins',
            'font-normal',
            'text-base',
            'transition-all',
            'overflow-hidden',
            'z-10',
            {
                'h-0': !isOpen,
                'h-fit': isOpen,
                'px-4': isOpen,
                'py-8': isOpen,
            }
        ),
    calendarBody: ({
        isInCurrentMonth,
        isSelected,
    }: {
        isInCurrentMonth: boolean;
        isSelected: boolean;
    }) =>
        clsx(
            'flex flex-col place-content-center text-center w-12 h-12 rounded-full font-poppins text-sm',
            {
                'bg-ivy-300': isSelected,
                'font-normal': !isSelected,
                'font-medium': isSelected,
                'text-neutral-900': !isSelected && isInCurrentMonth,
                'text-neutral-500': !isInCurrentMonth,
                'text-brandGreen-500': isSelected,
            }
        ),
    nextPage: ({ hasNextPage }: { hasNextPage: boolean }) =>
        clsx(
            'w-10',
            'h-10',
            'rounded-full',
            'text-sm',
            'font-poppins',
            'font-normal',
            'text-center',
            'align-middle',
            'border-neutral-400',
            'inline-flex',
            'items-center',
            'place-content-center',
            {
                'bg-white': hasNextPage,
                'bg-neutral-400': !hasNextPage,
                'border-0': hasNextPage,
                border: !hasNextPage,
                'cursor-pointer': hasNextPage,
                'cursor-default': !hasNextPage,
            }
        ),
    numResults: ({ isOpen }: { isOpen: boolean }) =>
        clsx(
            'absolute',
            'flex',
            'flex-col',
            'sm:top-[88px]',
            'top-16',
            '-left-2',
            'w-[200px]',
            'bg-white',
            'rounded-3xl',
            'shadow-[0_4px_24px_0_rgba(0,0,0,0.12)]',
            'font-poppins',
            'font-normal',
            'text-base',
            'transition-all',
            'overflow-hidden',
            'z-10',
            {
                'h-0': !isOpen,
                'h-fit': isOpen,
                'px-2': isOpen,
                'py-8': isOpen,
            }
        ),
    pageNumber: ({ isCurrentPage }: { isCurrentPage: boolean }) =>
        clsx(
            'w-10',
            'h-10',
            'rounded-full',
            'mr-2',
            'last:mr-0',
            'text-sm',
            'font-poppins',
            'font-normal',
            'text-center',
            'align-middle',
            'border-neutral-400',
            'inline-flex',
            'items-center',
            'place-content-center',
            {
                'font-semibold': isCurrentPage,
                ' bg-white': !isCurrentPage,
                ' bg-avocado-300': isCurrentPage,
                'text-brandGreen-500': isCurrentPage,
                'border-0': isCurrentPage,
                border: !isCurrentPage,
            }
        ),
    prevPage: ({ hasPrevPage }: { hasPrevPage: boolean }) =>
        clsx(
            'w-10',
            'h-10',
            'rounded-full',
            'text-sm',
            'font-poppins',
            'font-normal',
            'text-center',
            'align-middle',
            'border-neutral-400',
            'inline-flex',
            'items-center',
            'place-content-center',
            {
                'bg-white': hasPrevPage,
                'bg-neutral-400': !hasPrevPage,
                'border-0': hasPrevPage,
                border: !hasPrevPage,
                'cursor-pointer': hasPrevPage,
                'cursor-default': !hasPrevPage,
            }
        ),
    results:
        'flex flex-col gap-4 p-6 mt-6 bg-white sm:rounded-2xl shadow-[0_2px_0_1px_rgba(5,9,12,0.06)]',
    searchButton: clsx(
        'sm:font-poppins',
        'bg-brandGreen-500',
        'text-base',
        'py-3',
        'sm:py-5',
        'sm:ml-5',
        'grow-0',
        'min-w-[160px]',
        'rounded-full',
        'text-white',
        'font-semibold',
        'sm:font-medium',
        'tracking-wide',
        'cursor-pointer',
        averta.className
    ),
};

export default classes;
