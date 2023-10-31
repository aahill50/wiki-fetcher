'use client';

import clsx from 'clsx';
import { COUNTRY_CODE, COUNTRY_CODES, MENUS } from '~/constants';
import Icon from '../Icon';
import { useStore } from '~/store';
import iconChevronUp from '~/assets/icon_chevron_up.svg';
import iconGlobe from '~/assets/icon_globe.svg';
import { useCallback, useEffect, useState } from 'react';
import ActionBarMenu from './ActionBarMenu';

export default function CountryFilter() {
    const country = useStore((state) => state.country);
    const setCountry = useStore((state) => state.setCountry);
    const openMenu = useStore((state) => state.openMenu);
    const setOpenMenu = useStore((state) => state.setOpenMenu);

    const [displayCountry, setDisplayCountry] = useState(
        COUNTRY_CODES[country]
    );

    const [isOpen, setIsOpen] = useState(openMenu === MENUS.COUNTRY);

    useEffect(() => {
        setDisplayCountry(COUNTRY_CODES[country]);
    }, [country]);

    useEffect(() => {
        setIsOpen(openMenu === MENUS.COUNTRY);
    }, [openMenu]);

    const onClickCountryMenu = useCallback(() => {
        setOpenMenu(isOpen ? null : MENUS.COUNTRY);
    }, [isOpen, setOpenMenu]);

    const onClickCountry = useCallback((code: COUNTRY_CODE) => {
        setCountry(code);
    }, [setCountry]);

    const countryPicker = (
        <>
            {Object.keys(COUNTRY_CODES).map((key) => {
                const code = key as COUNTRY_CODE;
                const countryName = COUNTRY_CODES[code];
                return (
                    <div
                        key={`page-size-${code}`}
                        className='flex mb-6 last:mb-0'
                        onClick={() => onClickCountry(code)}
                    >
                        {countryName}
                    </div>
                );
            })}
        </>
    );

    const chevron = (
        <div className={clsx('transition-all', { 'rotate-180': !isOpen })}>
            <Icon
                svg={iconChevronUp}
                width={12}
                height={16}
                alt={isOpen ? 'num-results-active' : 'num-results-inactive'}
            />
        </div>
    );

    return (
        <ActionBarMenu
            isOpen={isOpen}
            displayValue={displayCountry}
            label='COUNTRY'
            icon={
                <Icon
                    alt='results-icon'
                    height={40}
                    svg={iconGlobe}
                    width={40}
                />
            }
            onClick={onClickCountryMenu}
        >
            <div
                className={clsx(
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
                    'overflow-y-scroll',
                    'max-h-[400px]',
                    'z-10',
                    {
                        'h-0': !isOpen,
                        'h-fit': isOpen,
                        'px-2': isOpen,
                        'py-8': isOpen,
                    }
                )}
            >
                {countryPicker}
            </div>
        </ActionBarMenu>
    )
    return (
        <div
            className='flex relative mb-6 sm:mb-0 sm:max-w-[200px] md:max-w-[260px] sm:hover:bg-neutral-100 sm:rounded-full sm:px-3 sm:py-4 cursor-pointer'
            onClick={onClickCountryMenu}
        >
            <div
                className={clsx(
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
                    {
                        'h-0': !isOpen,
                        'h-fit': isOpen,
                        'px-2': isOpen,
                        'py-8': isOpen,
                    }
                )}
            >
                {countryPicker}
            </div>
            <div className='relative'>
                <Icon
                    alt='results-icon'
                    height={40}
                    svg={iconGlobe}
                    width={40}
                />
            </div>
            <div className='flex flex-col ml-6'>
                <div className='flex items-center font-poppins font-medium text-neutral-400 text-xs tracking-wider cursor-pointer'>
                    COUNTRY
                    <div className='ml-1'>{chevron}</div>
                </div>
                <div className='font-poppins font-normal text-black text-base'>
                    {displayCountry}
                </div>
            </div>
        </div>
    );
}
