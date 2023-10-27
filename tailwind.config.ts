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
                neutral: {
                    400: '#D4D8D9',
                },
            },
            fontFamily: {
                averta: ['Averta Standard'],
                lora: ['Lora, serif'],
                poppins: ['Poppins, sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
