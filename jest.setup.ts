import '@testing-library/jest-dom';
jest.mock('next/image');
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
