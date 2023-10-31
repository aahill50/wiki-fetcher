import localFont from 'next/font/local';
import { Lora, Poppins } from 'next/font/google';

export const lora = Lora({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lora',
    weight: ['400', '500'],
});

export const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['400', '500', '600'],
});

export const averta = localFont({
    src: '../fonts/AvertaStandard.ttf',
    display: 'swap',
});
