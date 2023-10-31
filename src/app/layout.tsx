import clsx from 'clsx';
import type { Metadata } from 'next';
import { lora, poppins } from '~/fonts/fonts';
import './globals.css';

export const metadata: Metadata = {
    title: 'Wiki Fetcher',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={clsx('bg-neutral-100', lora.variable, poppins.variable)}>{children}</body>
        </html>
    );
}
