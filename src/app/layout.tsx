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
    const importCss = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');`;
    return (
        <html lang='en'>
            <style>{importCss}</style>
            <body className='bg-neutral-100'>{children}</body>
        </html>
    );
}
