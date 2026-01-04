// frontend/app/info/page.tsx
import { Icon } from "@iconify/react";

export default function InfoPage() {
    const interests = [
        {
            icon: "ph:code",
            title: "Software Engineering",
            desc: "웹·앱·서비스 전반의 소프트웨어 설계와 구현 — 상태 관리, API 설계, 데이터 모델링, 비동기 처리, 확장 가능한 시스템 구조"
        },
        {
            icon: "ph:database",
            title: "Databases & Data Modeling",
            desc: "PostgreSQL·MongoDB 사용 경험 — SQL 작성, 스키마 설계, 데이터 모델링 및 서비스 요구사항에 맞춘 구조 설계"
        },
        {
            icon: "ph:robot",
            title: "AI",
            desc: "머신러닝·딥러닝·DRL·AGI-like 시스템 연구·개발 [NLP, CV, 생성형 모델 등]"
        },
        {
            icon: "ph:game-controller",
            title: "Game",
            desc: "Unity/Unreal 사용 및 맞춤형 엔진 파이프라인 구축으로 몰입감 높은 인터랙션과 시스템적 게임 세계 구현"
        },
        {
            icon: "ph:hand",
            title: "HCI / Next-Gen Interfaces",
            desc: "VR부터 BCI까지 인간-컴퓨터 상호작용 확장 연구: 실시간 신호 처리, 지연 최소화, 멀티모달 입력 융합로 설계"
        },
        {
            icon: "ph:cube",
            title: "Graphics",
            desc: "OpenGL/DirectX/GLSL와 실시간 렌더링, 최적화·LOD·물리 기반 셰이딩으로 현실감 있는 대규모 환경 표현방식에 대한 학습 및 연구 관심"
        },
        {
            icon: "ph:cloud",
            title: "Cloud Computing",
            desc: "Docker·Kubernetes·Serverless 기반 클라우드 환경 구축 및 배포 경험 — 분산 시스템, 자동화 파이프라인, 관측성을 고려한 설계와 함께 대규모 연산·스트리밍 아키텍처에 대한 학습·연구 관심"
        },
        {
            icon: "ph:atom",
            title: "Quantum Computing",
            desc: "양자 알고리즘/시뮬레이션을 통한 강화학습·대규모 상태공간 탐색 가속 및 미래형 인터랙션에 대한 탐구 및 연구 관심"
        }
    ];

    return (
        <section className="max-w-5xl mx-auto py-20 px-4">
            <div className="space-y-24">
                {/* Header */}
                <header className="text-center space-y-6">
                    <h1 className="text-4xl font-bold">
                        Interactive Systems <br className="md:hidden" />
                        & AI-driven Software
                    </h1>

                    <p className="max-w-3xl mx-auto text-base opacity-80 leading-relaxed">
                        관심 분야는 <strong>AI · 시스템 · 인터랙티브 소프트웨어</strong>이며,
                        실제로 동작하는 구조를 설계하고 구현하는 프로젝트에 집중합니다.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 text-sm opacity-70">
                        <span className="badge badge-outline">AI Integration</span>
                        <span className="badge badge-outline">Backend</span>
                        <span className="badge badge-outline">Simulation</span>
                        <span className="badge badge-outline">Game Systems</span>
                    </div>
                </header>

                {/* How I Approach Problems */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold mb-8 text-center">
                        How I Approach Problems
                    </h2>

                    <ul className="max-w-3xl mx-auto space-y-3 text-sm opacity-85 text-center">
                        <li>• 구현 전에 구조, 데이터 흐름, 병목 지점을 먼저 정의</li>
                        <li>• 설명 가능한 설계와 트레이드오프를 중요하게 고려</li>
                        <li>• 작은 단위로 검증하며 점진적으로 시스템 확장</li>
                        <li>• 실험적인 아이디어도 실행 가능한 형태로 구현</li>
                    </ul>
                </section>

                {/* Interests */}
                <section className="space-y-6">
                    <h1 className="text-3xl font-bold mb-10 text-center">Interests</h1>
                    <p className="text-center mb-12 opacity-80">개발·연구·학습 분야들</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {interests.map((item, i) => (
                            <div key={i} className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition">
                                <div className="flex items-center gap-4 mb-3">
                                    <Icon icon={item.icon} className="w-8 h-8 text-gray-800 dark:text-gray-100" />
                                    <h2 className="text-xl font-semibold">{item.title}</h2>
                                </div>
                                <p className="opacity-80 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <div className="mt-12 text-center space-y-2">
                    <p>📧 Email: <a href="mailto:mmnkjiae@gmail.com" className="link link-primary">mmnkjiae@gmail.com</a></p>
                    <p>💻 GitHub: <a href="https://github.com/m97j" target="_blank" className="link link-primary">github.com/m97j</a></p>
                </div>
            </div>
        </section>
    );
}
