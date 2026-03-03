// frontend/app/page.tsx
"use client";

import ProjectCard from "../components/ProjectCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const projects = [
    {
      slug: "uni-har",
      title: "Uni HAR",
      coverUrl: "/images/har-safety-ai.png",
      summary:
        "멀티모달 포즈-이미지 융합 기반 행동 인식 모델 — OpenPose + RGB 이미지, Factorized Attention 기반 실시간 행동 인식",
      tags: ["Python", "PyTorch", "Colab"],
      language: "py",
    },
    {
      slug: "pragmatic-llm-search",
      title: "Pragmatic LLM Search",
      coverUrl: "/images/pragmatic-llm-search.png",
      summary:
        "오픈소스 LLM 기반 검색+요약 챗봇 — RAG 구조, QLoRA/DPO 튜닝, Hugging Face Space SaaS 프로토타입",
      tags: ["PyTorch", "Gradio", "LLM", "Vector DB", "HuggingFace", "Search API"],
      language: "ts",
    },
    {
      slug: "persona-chat-engine",
      title: "Persona Chat Engine",
      coverUrl: "/images/persona-chat-engine.png",
      summary:
        "게임 내 NPC 상호작용을 위한 AI 대화 엔진 — Transformer 기반 LLM, LoRA 파인튜닝, RAG 기반 컨텍스트 검색. ⚡ FPS Game NPC AI에 통합 적용",
      tags: ["FastAPI", "LLM", "Docker", "HuggingFace"],
      language: "py",
    },
    {
      slug: "fpsgame",
      title: "FPS Game",
      coverUrl: "/images/fpsgame.png",
      summary:
        "Unity 기반 1인칭 슈팅 프로젝트 — FSM → Behavior Tree → ML-Agents PPO로 확장된 적 AI 설계 및 강화학습 적용. 🤝 NPC 대화는 Persona Chat Engine과 연동",
      tags: ["Unity", "ML-Agents", "MongoDB", "Node.js"],
      language: "cs",
    },
  ];

  const slidesCount = projects.length;
  const enableLoop = slidesCount >= 4;

  return (
    <section className="space-y-32 text-base-content">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-gradient-to-br from-base-100 to-base-200 dark:from-neutral dark:to-neutral">
        <div className="hero-content text-center flex flex-col gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold"
          >
            Building Intelligent <span className="text-primary">&</span> <br className="md:hidden" />
            Interactive Systems
          </motion.h2>
          <p className="text-lg max-w-2xl mx-auto opacity-80">
            <strong>Projects · Research & Development · Study Notes</strong> <br />
            프로젝트, 연구·개발, 학습의 과정과 결과를 정리한 아카이브
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Link href="/projects" className="btn btn-primary">
              🌱 View Projects
            </Link>
            <Link href="/info" className="btn btn-outline btn-primary">
              📘 About Me
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              ✉️ Contact Me
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Projects - Carousel */}
      <div className="px-4 py-20 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            🔧 Featured Projects
          </h2>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1.2}
            centeredSlides
            loop={enableLoop}
            autoplay={
              enableLoop
                ? { delay: 4000, disableOnInteraction: false }
                : false
            }
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              768: { slidesPerView: 1.4 },
              1024: { slidesPerView: 1.8 },
            }}
          >
            {projects.map((project, i) => (
              <SwiperSlide key={project.slug}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Notes / Blogs Preview */}
      <div className="px-4 py-20 bg-base-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Study Notes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card bg-base-100 shadow-xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">📝 Study Notes</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="/notes/transformer-basics" className="link link-primary">
                  Transformer 기본 구조
                </Link>
              </li>
              <li>
                <Link href="/notes/rlhf-intro" className="link link-primary">
                  RLHF 개요
                </Link>
              </li>
              <li>
                <Link href="/notes/diffusion-models" className="link link-primary">
                  Diffusion Models 이해하기
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Dev Blogs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card bg-base-100 shadow-xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">📘 Dev Blogs</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="/blogs/fpsgame-overview" className="link link-primary">
                  FPS Game: 프로젝트 개요
                </Link>
              </li>
              <li>
                <Link href="/blogs/persona-chat-engine-plan" className="link link-primary">
                  Persona Chat Engine: 설계와 계획
                </Link>
              </li>
              <li>
                <Link href="/blogs/pragmatic-llm-search-design" className="link link-primary">
                  Pragmatic LLM Search: 프로젝트 구상
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
