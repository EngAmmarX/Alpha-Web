import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const fontSans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALPHA POWER for Electrical Industries | مصنع ألفا باور للصناعات الكهربائية",
  description: "مصنع ألفا باور للصناعات الكهربائية (ALPHA POWER for Electrical Industries) — حلول رائدة ومتكاملة في تصنيع وتوريد لوحات الجهد المنخفض وسلالم وحوامل الكابلات المعدنية، والأنظمة الكهروميكانيكية المتطورة.",
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('alpha_theme');
                if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                }
                var l = localStorage.getItem('alpha_lang');
                if (l === 'en') {
                  document.documentElement.lang = 'en';
                  document.documentElement.dir = 'ltr';
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${fontSans.variable} font-sans antialiased bg-background text-foreground min-h-screen selection:bg-[#d4af37]/30 selection:text-[#f3e5ab]`}>
        {children}
      </body>
    </html>
  );
}
