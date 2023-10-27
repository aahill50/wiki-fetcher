import clsx from 'clsx';
import { useStore } from '~/store';

interface Props {
    pageNumber: number;
    onClick: (pageNumber: number) => void;
}

export default function PageNumber(props: Props) {
    const page = useStore((state) => state.page);
    const { pageNumber, onClick } = props;
    const isCurrentPage = pageNumber === page;

    return (
        <li
            key={pageNumber}
            onClick={() => onClick(pageNumber)}
            className={clsx(
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
            )}
        >
            {pageNumber}
        </li>
    );
}
