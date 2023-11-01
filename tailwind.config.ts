import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                avocado: {
                    300: '#E0E9CB',
                },
                brandGreen: {
                    500: '#025B4B',
                },
                ivy: {
                    300: '#B3CEC9',
                },
                marigold: {
                    500: '#E68A00',
                },
                neutral: {
                    400: '#D4D8D9',
                    500: '#A7AAAB',
                    600: '#737680',
                    900: '#05090D',
                },
            },
            fontFamily: {
                averta: ['Averta Standard'],
                lora: ['var(--font-lora), serif'],
                poppins: ['var(--font-poppins), sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
