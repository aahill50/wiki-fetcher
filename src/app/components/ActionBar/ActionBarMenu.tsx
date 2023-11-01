import { ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '../Icon';
import iconChevronUp from '~/assets/icon_chevron_up.svg';

interface Props {
    icon: ReactNode;
    isOpen: boolean;
    label: string;
    smallLabel?: string;
    displayValue: ReactNode;
    children: ReactNode;
    onClick: () => void;
}

export default function ActionBarMenu(props: Props) {
    const {
        icon,
        isOpen,
        label,
        smallLabel = label,
        displayValue,
        children,
        onClick,
    } = props;

    const chevron = (
        <div
            className={clsx('transition-all', {
                'rotate-180': !isOpen,
            })}
        >
            <Icon
                svg={iconChevronUp}
                width={12}
                height={16}
                alt='date-selector-inactive'
            />
        </div>
    );

    return (
        <div className='grow flex relative mb-6 sm:mb-0 sm:hover:bg-neutral-100 sm:rounded-full sm:px-3 sm:py-4 cursor-pointer transition-all'>
            {icon}
            <div className='flex flex-col ml-6' onClick={onClick}>
                <div className='flex items-center font-poppins font-medium text-neutral-400 text-xs tracking-wider cursor-pointer'>
                    <span className={'visible sm:max-md:hidden'}>{label}</span>
                    <span className={'max-sm:hidden md:hidden sm:visible'}>
                        {smallLabel}
                    </span>
                    <div className='ml-1'>{chevron}</div>
                </div>
                <div className='font-poppins font-normal text-black text-base sm:max-md:text-sm text-ellipsis overflow-hidden'>
                    {displayValue}
                </div>
            </div>
            {children}
        </div>
    );
}
