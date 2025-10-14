// backend/src/tags/seed.ts
import { prisma } from '../utils/prisma';

const TAG_GUIDE: Record<string, { label: string; description: string }> = {
  '🔷': { label: 'Game Client', description: '게임 클라이언트 전반' },
  '🔴': { label: 'AI Development', description: 'AI 개발 전반' },
  '🟣': { label: 'XR / Creative Tech', description: 'VR/AR/그래픽/시네마틱' },
  '🟠': { label: 'Web / API Development', description: '웹/프론트/API/데이터 시각화' },
  '⚫': { label: 'Backend / Infra', description: '서버/DB/보안/네트워크' },
  '🟢': { label: 'Cloud / DevOps', description: '클라우드/CI/CD/컨테이너' },
  '🎮': { label: 'Gameplay', description: '스토리·전투·퀘스트·규칙 시스템' },
  '🕹': { label: 'Interaction', description: '입력·UI·오브젝트 상호작용' },
  '🎯': { label: 'Actor/Pawn AI', description: 'FSM·BT·RL·경로 탐색' },
  '🗺': { label: 'Level/Scene', description: '씬 구성·오브젝트 배치·최적화' },
  '🗣': { label: 'NLP', description: '자연어 처리' },
  '📷': { label: 'CV', description: '컴퓨터 비전' },
  '🖇': { label: 'Multimodal AI', description: '멀티모달 AI' },
  '🎨': { label: 'Generative AI', description: '생성형 AI' },
  '🤖': { label: 'Unified Intelligence', description: 'AGI-like 시스템' },
  '🧠': { label: 'AGI Research', description: '단일모델 AGI 연구' },
  '🥽': { label: 'VR', description: '가상현실' },
  '📱': { label: 'AR', description: '증강현실' },
  '🖌': { label: 'VFX/Graphics', description: '비주얼 이펙트/그래픽' },
  '🎬': { label: 'Cinematic', description: '시네마틱' },
  '🌐': { label: 'Frontend', description: '웹 프론트엔드' },
  '🔌': { label: 'API', description: 'API 개발' },
  '📊': { label: 'Data Viz', description: '데이터 시각화' },
  '🗄': { label: 'Database', description: 'DB 설계/운영' },
  '🔒': { label: 'Security', description: '보안' },
  '⚡': { label: 'Realtime', description: '실시간 처리' },
  '📡': { label: 'Networking', description: '네트워크' },
  '☁️': { label: 'Cloud', description: '클라우드' },
  '🔄': { label: 'CI/CD', description: '지속적 통합/배포' },
  '🐳': { label: 'Docker/K8s', description: '컨테이너/쿠버네티스' },
};

async function main() {
  for (const [emoji, meta] of Object.entries(TAG_GUIDE)) {
    await prisma.tag.upsert({
      where: { emoji },
      update: { label: meta.label, description: meta.description },
      create: { emoji, label: meta.label, description: meta.description },
    });
  }
  console.log('Tag guide seeded.');
}
main().catch(e => { console.error(e); process.exit(1); }).finally(async () => prisma.$disconnect());
