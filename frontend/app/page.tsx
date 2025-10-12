import ProjectCard from "../components/ProjectCard";
import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-20">
        <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          개발자로서의 여정을 기록하고, 프로젝트와 학습 내용을 공유합니다.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link
            href="/projects"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Projects
          </Link>
          <Link
            href="/vlogs"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900"
          >
            Dev Vlog
          </Link>
        </div>
      </div>

      {/* Featured Projects */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard
            project={{
              slug: "portfolio",
              title: "Portfolio Website",
              coverUrl: "/images/portfolio.png",
              summary: "Next.js와 TypeScript로 만든 개인 포트폴리오 사이트",
              tags: ["Next.js", "TypeScript", "TailwindCSS"],
              language: "ts",
            }}
          />
          <ProjectCard
            project={{
              slug: "blog",
              title: "Blog Platform",
              coverUrl: "/images/blog.png",
              summary: "Markdown 기반 블로그 플랫폼",
              tags: ["Node.js", "Prisma", "PostgreSQL"],
              language: "js",
            }}
          />
        </div>
      </div>

      {/* Notes / Vlogs Preview */}
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Latest Notes</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Link href="/notes/nextjs-routing">Next.js 라우팅 정리</Link>
            </li>
            <li>
              <Link href="/notes/prisma-setup">Prisma 초기 설정</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Dev Vlogs</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Link href="/vlogs/deploy-azure">Azure 배포 과정 기록</Link>
            </li>
            <li>
              <Link href="/vlogs/github-actions">GitHub Actions CI/CD 구성</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
