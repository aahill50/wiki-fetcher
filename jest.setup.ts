import '@testing-library/jest-dom';
import { mockState } from '~/testUtilities';
import Image from 'next/image';
import React from 'react';

jest.mock('~/store', () => ({
    useStore: (stateFunction: Function) => {
        return stateFunction(mockState);
    },
}));

jest.mock('next/image', () => {
    return jest.fn((props) => {
        return React.createElement('img', props);
    });
});
jest.mock('./src/assets/icon_calendar.svg', () => '<svg>icon_calendar</svg>');
jest.mock(
    './src/assets/icon_chevron_down.svg',
    () => '<svg>icon_chevron_down</svg>'
);
jest.mock(
    './src/assets/icon_chevron_left.svg',
    () => '<svg>icon_chevron_left</svg>'
);
jest.mock(
    './src/assets/icon_chevron_right.svg',
    () => '<svg>icon_chevron_right</svg>'
);
jest.mock(
    './src/assets/icon_chevron_up.svg',
    () => '<svg>icon_chevron_up</svg>'
);
jest.mock('./src/assets/icon_globe.svg', () => '<svg>icon_globe</svg>');
jest.mock('./src/assets/icon_list.svg', () => '<svg>icon_list</svg>');
jest.mock('./src/assets/icon_pin_empty.svg', () => '<svg>icon_pin_empty</svg>');
jest.mock(
    './src/assets/icon_pin_filled.svg',
    () => '<svg>icon_pin_filled</svg>'
);
jest.mock('next/font/local', () => () => ({ className: '' }));
jest.mock('next/font/google', () => ({
    Lora: jest.fn(),
    Poppins: jest.fn(),
}));
