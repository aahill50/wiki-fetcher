import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Wiki Fetcher',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cssImports = [
        `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');`,
        `@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500&display=swap');`,
    ].map((importStatement) => <style>{importStatement}</style>);
    return (
        <html lang='en'>
            {cssImports}
            <body className='bg-neutral-100'>{children}</body>
        </html>
    );
}
