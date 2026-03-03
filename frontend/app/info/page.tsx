"use client";

import { motion } from "framer-motion";
import { Mail, Github, BookOpen, Terminal, Cpu, Target, Zap, ChevronRight } from "lucide-react";

export default function InfoPage() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    return (
        <div className="min-h-screen text-base-content py-16 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto space-y-24">

                {/* Section 1: Identity & Profile - Clarifying the direction */}
                <motion.section initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight flex flex-col">
                        <span>AI/ML Engineering &</span>
                        <span className="text-primary self-end mt-2 pr-12 sm:pr-0">
                            Systems Architecture
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-base-content/80 leading-relaxed max-w-3xl">
                        최신 기술의 <strong>이론적 원리를 깊이 있게 분석</strong>하고, 이를 고성능 시스템 아키텍처 위에서 <br className="hidden md:block" />
                        실제로 동작하고 상호작용하는 견고한 소프트웨어로 <strong>구축(Building)</strong>하는 데 집중합니다.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <a href="mailto:mmnkjiae@gmail.com" className="btn btn-primary">
                            <Mail className="w-4 h-4 mr-2" /> Contact Me
                        </a>
                        <a href="https://github.com/m97j" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                            <Github className="w-4 h-4 mr-2" /> GitHub
                        </a>
                    </div>
                </motion.section>

                {/* Section 2: Engineering Philosophy */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-base-300 pb-2">💡 Engineering Philosophy</h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        <motion.div variants={fadeIn} className="card bg-base-200 p-6 shadow-sm">
                            <BookOpen className="w-8 h-8 text-primary mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Fundamentals First</h3>
                            <p className="text-sm text-base-content/70">
                                기술의 표면적 사용보다 기반이 되는 이론적 원리를 먼저 이해합니다. 시스템의 구조적 타당성을 바닥부터 분석하여 본질적인 해결책을 연구합니다.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeIn} className="card bg-base-200 p-6 shadow-sm">
                            <Zap className="w-8 h-8 text-primary mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Hypothesis & Verification</h3>
                            <p className="text-sm text-base-content/70">
                                아이디어를 가설에 머무르게 하지 않습니다. PoC 구현을 통한 신속한 검증과 정량적 데이터 분석으로 기술적 근거를 확보합니다.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeIn} className="card bg-base-200 p-6 shadow-sm">
                            <Cpu className="w-8 h-8 text-primary mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Systemic Architecture</h3>
                            <p className="text-sm text-base-content/70">
                                소프트웨어와 인프라를 독립된 요소로 보지 않습니다. 전체 파이프라인의 데이터 흐름과 연산 효율을 고려한 통합적 설계를 지향합니다.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Section 3: Core Expertise */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-base-300 pb-2">⚙️ Core Expertise</h2>
                    <div className="space-y-10">

                        {/* 1. AI Research & Model Engineering */}
                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                            <div className="sm:w-1/3 flex-shrink-0">
                                <h3 className="font-bold text-lg">AI Research & Implementation</h3>
                                <p className="text-sm text-base-content/60 mt-1">이론 분석 기반 모델 및 파이프라인 구축</p>
                            </div>
                            <div className="sm:w-2/3 text-base-content/80 text-sm">
                                <p className="mb-3 leading-relaxed">
                                    최신 SOTA 논문의 아키텍처를 분석하여 PyTorch 기반으로 직접 구현하고, 데이터 수집부터 전처리, 학습, 성능 벤치마크까지의 <strong>End-to-End 파이프라인</strong>을 구축합니다. 모델의 수치적 성능뿐만 아니라 실제 서비스 적용을 위한 연산 복잡도와 구조적 타당성을 함께 검토합니다.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="badge badge-primary badge-outline">PyTorch</span>
                                    <span className="badge badge-primary badge-outline">SOTA Implementation</span>
                                    <span className="badge badge-primary badge-outline">Data Pipeline</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. System Optimization & Efficiency */}
                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                            <div className="sm:w-1/3 flex-shrink-0">
                                <h3 className="font-bold text-lg">High-Performance Optimization</h3>
                                <p className="text-sm text-base-content/60 mt-1">연산 효율성 및 추론 최적화</p>
                            </div>
                            <div className="sm:w-2/3 text-base-content/80 text-sm">
                                <p className="mb-3 leading-relaxed">
                                    제한된 하드웨어 자원에서 최대의 성능을 이끌어내기 위한 <strong>경량화 및 최적화 기술</strong> 을 연구합니다. 1.58-bit 양자화(BitNet)와 같은 최신 기법을 적용해보고, 시스템 메모리(KV Cache) 관리 및 Sparsity 기반 연산 제어를 통해 실행 가능성(Feasibility)을 극대화합니다.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="badge badge-accent badge-outline">Quantization</span>
                                    <span className="badge badge-accent badge-outline">Inference Optimization</span>
                                    <span className="badge badge-accent badge-outline">Efficiency Benchmark</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. Scalable Systems Architecture */}
                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                            <div className="sm:w-1/3 flex-shrink-0">
                                <h3 className="font-bold text-lg">Scalable Systems Architecture</h3>
                                <p className="text-sm text-base-content/60 mt-1">확장성 있는 서비스 및 상호작용 설계</p>
                            </div>
                            <div className="sm:w-2/3 text-base-content/80 text-sm">
                                <p className="mb-3 leading-relaxed">
                                    FastAPI와 Next.js를 활용하여 <strong>실시간 상호작용이 가능한 시스템</strong>을 설계합니다. 복잡한 비즈니스 로직을 위한 상태 관리(FSM), RAG 기반 오케스트레이션, 그리고 이를 지탱하는 백엔드 아키텍처의 확장성을 중점적으로 고려하여 사용자 중심의 완성도 높은 소프트웨어를 구축합니다.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="badge badge-secondary badge-outline">Full-stack Engineering</span>
                                    <span className="badge badge-secondary badge-outline">API Design</span>
                                    <span className="badge badge-secondary badge-outline">System Integration</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </motion.section>

                {/* Section 4: Expertise Matrix - Tech Stack */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-black uppercase flex items-center gap-3">
                        <Terminal className="w-6 h-6" /> Expertise Matrix
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { category: "Deep Learning", skills: ["PyTorch", "HuggingFace", "Scikit-learn"] },
                            { category: "Systems & Opt", skills: ["ONNX", "Quantization", "TensorRT"] },
                            { category: "Backend/Infra", skills: ["FastAPI", "PostgreSQL", "Docker"] },
                            { category: "User Experience", skills: ["Next.js", "Tailwind", "Unity"] }
                        ].map((item, idx) => (
                            <div key={idx} className="border border-base-300 p-5 rounded-2xl hover:bg-base-200 transition-colors">
                                <h4 className="text-xs font-bold opacity-40 mb-3 uppercase tracking-tighter text-primary">{item.category}</h4>
                                <ul className="space-y-1 font-mono text-sm font-semibold">
                                    {item.skills.map((skill, sIdx) => (
                                        <li key={sIdx} className="flex items-center gap-1">
                                            <ChevronRight className="w-3 h-3 text-primary" /> {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 5: Research Vision */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                    className="space-y-6 bg-base-300/50 p-8 rounded-3xl border border-base-300"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Target className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold italic">Research Vision: Beyond Implementation</h2>
                    </div>

                    <p className="text-base-content/90 leading-relaxed mb-6">
                        단순한 특정 태스크 수행을 위한 도구로서의 AI를 넘어, 현실 세계의 물리적 법칙과 인과 관계를 이해하는 <strong>'World Model'</strong>을 탐구합니다. 인지 구조와 연산 효율이 결합된 차세대 지능 시스템을 구축하여, 인간과 시스템이 더 깊게 상호작용하는 미래를 설계합니다.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <span className="text-primary font-black text-lg">01</span>
                                <div>
                                    <h4 className="font-bold text-base-content">Efficient Architectures</h4>
                                    <p className="text-base-content/70">Transformer를 넘어선 차세대 아키텍처와 수학적 최적화 기반의 고효율 지능 모델 연구</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary font-black text-lg">02</span>
                                <div>
                                    <h4 className="font-bold text-base-content">Autonomous Agents</h4>
                                    <p className="text-base-content/70">신경망과 물리 엔진이 융합되어 가상/현실 환경에서 스스로 판단하고 행동하는 자율형 에이전트 구축</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <span className="text-primary font-black text-lg">03</span>
                                <div>
                                    <h4 className="font-bold text-base-content">Hardware-Aware AI</h4>
                                    <p className="text-base-content/70">뉴로모픽 등 차세대 컴퓨팅 환경에 최적화된 저전력·고성능 지능 모델링 및 배포 전략 탐구</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary font-black text-lg">04</span>
                                <div>
                                    <h4 className="font-bold text-base-content">Cognitive Systems</h4>
                                    <p className="text-base-content/70">인간의 인지 구조를 모사한 동적 상태 관리(Memory)와 논리적 추론 프로세스 시스템 설계</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </motion.section>

            </div>
        </div>
    );
}