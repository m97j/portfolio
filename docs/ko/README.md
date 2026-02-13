# 🧠 [Tech Portfolio](https://minjae-portfolio.vercel.app)
 
지능적인 AI 시스템을 만들기 위한 프로젝트 모음집입니다.  
(세부 구현 및 설명은 각 프로젝트 repo에 포함되어 있습니다)

---

## 🧰 Tech Stack
- **Languages**: C++, C#, Java, Python, JavaScript...  
- **AI / ML**: TensorFlow, PyTorch, HuggingFace, scikit-learn...  
- **Web**: React, Node.js, next.js, Flask...  
- **Game Engines**: Unity, Unreal Engine(학습 중)  
- **Infra / Cloud**: Git, AWS, Azure, MongoDB, MySQL...  

---

## 🔖 [Project Tag Guide](../../guides/ko)

---

## 🚀 Projects

### 🔴 AI Projects
- [🖇 HAR Safety AI <🔴[🖇📷]>](https://github.com/m97j/har-safety-ai)  
  **멀티모달 포즈-이미지 융합 기반 행동 인식 모델**  
  → OpenPose 기반 포즈 시퀀스 + RGB 이미지 시퀀스 융합  
  → **2단계 학습 전략**: 포즈 사전학습(MPOSE) → 멀티모달 파인튜닝(HAA500)  
  → Factorized Attention + 경량 CNN으로 **실시간 위험 행동 인식** 구현  
  → 산업 안전, 공공 안전, 스포츠 분석 등 다양한 도메인 확장 가능  
  → Capstone 프로젝트 확장, 범용 HAR 모델 학습 ~~및 서비스 서버 배포~~[진행 예정]  
  🔗 [HF Model](https://huggingface.co/m97j/har-safety-model) · [Model Card](https://huggingface.co/m97j/har-safety-model)

- [🗣 Persona Chat Engine <🔴[🗣🎨]⚫🔷>](https://github.com/m97j/persona-chat-engine)  
  게임 내 NPC 상호작용을 위한 **AI 대화 엔진**  
  → Transformer 기반 LLM + (Q)LoRA 파인튜닝, Delta/Flag 멀티헤드 학습  
  → FastAPI 서버 + Hugging Face Spaces 배포 (Dockerfile 자동 빌드)  
  → NPC 신뢰도·관계·퀘스트 이벤트 반영 대화, RAG 기반 컨텍스트 검색  
  🔗 [HF Spaces](https://huggingface.co/spaces/m97j/PersonaChatEngine_hf-serve) · [Model Card](https://huggingface.co/m97j/npc_LoRA-fps)

- [🗣 Pragmatic LLM Search <🔴[🗣🖇]🟢>](https://github.com/m97j/pragmatic-llm-search)  
  오픈소스 LLM 기반 검색+요약 챗봇 (7B~10B급 모델)  
  → RAG 구조 설계, QLoRA/DPO 튜닝, 검색+리랭킹+컨텍스트 구성  
  → Hugging Face Space SaaS 프로토타입 배포 (Triton, Docker)

### 🔷 Game Development
- [🕹 FPS Game <🔷[🕹🎯🗺🎮]⚫🟢>](https://github.com/m97j/fpsgame)  
  Unity 기반 1인칭 슈팅(FPS) 프로젝트 (Beta Release)  
  → **FSM → Behavior Tree → ML-Agents PPO**로 확장된 적 AI 설계 및 강화학습 적용  
  → Node.js + MongoDB 기반 클라이언트-서버 구조, 다중 맵 플레이, 무기 시스템 구현  
  → GitFlow 전략과 모듈화된 디렉토리 구조로 협업·확장성 고려  
  🔗 [시연 영상](https://youtu.be/98fkWuGhLA0) · [Release](https://github.com/m97j/FpsGame/releases/tag/v0.2-beta)

### 🟠 Web & Cloud
- [🖥️ Kakao Login Web Service <🟠⚫>](https://github.com/m97j/WSD4_kakao_login_auth) — React + Node.js + MongoDB
- ~~[☁️ Image Conversion Service <🟠⚫🟢🔴[📷]>](https://github.com/m97j/cloudapp) — Flask + AWS EC2~~[추가예정]  

### 🎓 Academic Projects  
- [📘 Artificial Intelligence <🔴>](https://github.com/m97j/pacman-ai) — pacman game에서 탐색/전략 알고리즘 구현 + DQN 확장 구현 
- [📘 Machine Learning <🔴>](https://github.com/m97j/ml-assignments) — 고전 ML 알고리즘 구현  
- [📘 Data Mining <🔴⚫>](https://github.com/m97j/dm-assignments) — PageRank, 추천 시스템, Kaggle 실습  
- [📘 Natural Language Processing <🔴[🗣]>](https://github.com/m97j/nlp-assignments) — tokenizer, 한글 오토마타, 교내 kaggle 대회 참가  


---

## 📩 Contact
- Email: **mmnkjiae@gmail.com**  
- GitHub: [github.com/m97j](https://github.com/m97j)  
