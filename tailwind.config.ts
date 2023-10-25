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
                brandGreen: {
                    500: '#025B4B',
                },
            },
            fontFamily: {
                averta: ['Averta Standard'],
                lora: ['Lora'],
                poppins: ['Poppins, sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
