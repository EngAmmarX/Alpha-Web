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
  title: "Advanced Alpha Power | حلول كهروميكانيكية وصناعية متقدمة",
  description: "شركة القوة المتقدمة للتجارة والمقاولات (AAP) ومصنع ألفا المتقدم ببرج العرب — حلول متكاملة في التكييف، الكهرباء، مكافحة الحريق، التصنيع وتوريد لوحات الجهد المنخفض وسلالم الكابلات بالمملكة العربية السعودية ومصر.",
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
      <body className={`${fontSans.variable} font-sans antialiased bg-background text-foreground min-h-screen selection:bg-[#d4af37]/30 selection:text-[#f3e5ab]`}>
        {children}
      </body>
    </html>
  );
}
