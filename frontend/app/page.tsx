"use client";

import ProjectCard from "../components/ProjectCard";
import Link from "next/link";
import DarkModeToggle from "../components/DarkModeToggle";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="space-y-32 bg-base-200 text-base-content">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-gradient-to-br from-base-100 to-base-200 dark:from-neutral dark:to-neutral">
        <div className="hero-content text-center flex flex-col gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold"
          >
            Welcome to My Portfolio ✨
          </motion.h2>
          <p className="text-lg max-w-2xl mx-auto opacity-80">
            개발자로서의 여정을 기록하고, 프로젝트와 학습 내용을 공유합니다.
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Link href="/projects" className="btn btn-primary">
              🌱 View Projects
            </Link>
            <Link href="/blogs" className="btn btn-outline btn-primary">
              📘 Dev Blog
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              ✉️ Contact Me
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="px-4 py-20 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            🔧 Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <ProjectCard
                  project={{
                    slug: i === 0 ? "portfolio" : i === 1 ? "blog" : "game",
                    title:
                      i === 0
                        ? "Portfolio Website"
                        : i === 1
                        ? "Blog Platform"
                        : "Game Project",
                    coverUrl:
                      i === 0
                        ? "/images/portfolio.png"
                        : i === 1
                        ? "/images/blog.png"
                        : "/images/game.png",
                    summary:
                      i === 0
                        ? "Next.js와 TypeScript로 만든 개인 포트폴리오 사이트"
                        : i === 1
                        ? "Markdown 기반 블로그 플랫폼"
                        : "Unity/Unreal 기반 게임 프로젝트",
                    tags:
                      i === 0
                        ? ["Next.js", "TypeScript", "TailwindCSS"]
                        : i === 1
                        ? ["Node.js", "Prisma", "PostgreSQL"]
                        : ["Unity", "C#", "Unreal"],
                    language: i === 0 ? "ts" : i === 1 ? "js" : "cs",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Notes / Blogs Preview */}
      <div className="px-4 py-20 bg-base-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card bg-base-100 shadow-xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">📘 Study Notes</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="/notes/nextjs-routing" className="link link-primary">
                  Next.js 라우팅 정리
                </Link>
              </li>
              <li>
                <Link href="/notes/prisma-setup" className="link link-primary">
                  Prisma 초기 설정
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card bg-base-100 shadow-xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">📝 Dev Blogs</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="/blogs/deploy-azure" className="link link-primary">
                  Azure 배포 과정 기록
                </Link>
              </li>
              <li>
                <Link href="/blogs/github-actions" className="link link-primary">
                  GitHub Actions CI/CD 구성
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
