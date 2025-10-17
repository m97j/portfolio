import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientLayout from "../components/ClientLayout";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "mjk's portfolio",
  description: "Next.js 기반 포트폴리오 사이트",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
        <ClientLayout>
          <Header />
          <main className="pt-20 max-w-6xl mx-auto px-4">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
