import type { Metadata } from "next";
import Header from "../components/header";
// import Footer from "../components/Footer"; // Footer 컴포넌트도 있다면
import "./globals.css";

export const metadata: Metadata = {
  title: "민재의 포트폴리오",
  description: "Next.js 기반 포트폴리오 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
        <Header />
        <main className="pt-16 max-w-5xl mx-auto px-4">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
