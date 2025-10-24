// frontend/app/info/page.tsx
import { Icon } from "@iconify/react";

export default function InfoPage() {
    const interests = [
    { 
        icon: "ph:game-controller", 
        title: "게임 개발", 
        desc: "Unity/Unreal 심화 및 맞춤형 엔진 파이프라인 구축으로 몰입감 높은 인터랙션과 시스템적 게임 세계 구현"
    },
    { 
        icon: "ph:hand", 
        title: "HCI / 차세대 인터페이스", 
        desc: "VR부터 BCI까지 인간-컴퓨터 상호작용 확장 연구: 실시간 신호 처리, 지연 최소화, 멀티모달 입력 융합로 설계"
    },
    { 
        icon: "ph:robot", 
        title: "인공지능", 
        desc: "머신러닝·딥러닝·DRL·AGI-like 시스템으로 자율적 세계 시뮬레이션, 지능형 NPC, 동적 룰/내러티브 생성"
    },
    { 
        icon: "ph:cube", 
        title: "그래픽스", 
        desc: "OpenGL/DirectX/GLSL와 실시간 렌더링, 최적화·LOD·물리 기반 셰이딩으로 현실감 있는 대규모 환경 표현"
    },
    { 
        icon: "ph:atom", 
        title: "양자 컴퓨팅", 
        desc: "양자 알고리즘/시뮬레이션을 통한 강화학습·대규모 상태공간 탐색 가속 및 미래형 인터랙션 계산 기반 탐구"
    },
    { 
        icon: "ph:cloud", 
        title: "클라우드 컴퓨팅", 
        desc: "Docker/K8s/Serverless·분산 시스템으로 멀티플레이 스케일링, AI 학습 파이프라인, 관측성/자동화 인프라"
    },
    ];

    return (
        <section className="max-w-5xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-10 text-center">✨ 관심사들</h1>
        <p className="text-center mb-12 opacity-80">관심 있는 개발 분야와 관련 기술들</p>
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

        <div className="mt-12 text-center space-y-2">
            <p>📧 Email: <a href="mailto:mmnkjiae@gmail.com" className="link link-primary">mmnkjiae@gmail.com</a></p>
            <p>💻 GitHub: <a href="https://github.com/m97j" target="_blank" className="link link-primary">github.com/m97j</a></p>
        </div>
        </section>
    );
}
