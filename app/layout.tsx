import type { Metadata } from 'next';
import { I18nProvider } from '@/lib/i18n';
import './globals.css';
import './fonts.css';
import './custom.css'

export const metadata: Metadata = {
  title: 'Axiom Launcher',
  description: 'Axiom Launcher',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
        <script src="https://cdn-l1.services.shinory.ru/shinory-public/scripts/widgets/byshinory.js" async />
      </body>
    </html>
  );
}
