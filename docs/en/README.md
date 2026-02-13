# 🧠 [Tech Portfolio](https://minjae-portfolio.vercel.app)

A collection of projects for creating intelligent AI systems.  
(Detailed implementation and explanations are included in each project repo.)

---

## 🧰 Tech Stack
- **Languages**: C++, C#, Java, Python, JavaScript...

- **AI / ML**: TensorFlow, PyTorch, HuggingFace, scikit-learn...

- **Web**: React, Node.js, next.js, Flask...

- **Game Engines**: Unity, Unreal Engine (under study)

- **Infra / Cloud**: Git, AWS, Azure, MongoDB, MySQL...

---

## 🔖 [Project Tag Guide](../../guides/en/README.md)

---

## 🚀 Projects

### 🔴 AI Projects
- [🖇 HAR Safety AI <🔴[🖇📷]>](https://github.com/m97j/har-safety-ai)  
**Multimodal pose-image fusion-based action recognition model**  
→ OpenPose-based pose sequence + RGB image sequence fusion  
→ **Two-stage learning strategy**: Pose pre-training (MPOSE) → Multimodal fine-tuning (HAA500)  
→ **Real-time risky action recognition** implemented using factorized attention and lightweight CNN  
→ Expandable to various domains, including industrial safety, public safety, and sports analytics.  
→ Expanding the Capstone project, training a general-purpose HAR model and deploying a service server. [In progress]  
🔗 [HF Model](https://huggingface.co/m97j/har-safety-model) · [Colab Notebook](https://huggingface.co/m97j/har-safety-model)  

- [🗣 Persona Chat Engine <🔴[🗣🎨]⚫🔷>](https://github.com/m97j/persona-chat-engine)  
**AI conversation engine** for in-game NPC interactions  
→ Transformer-based LLM + (Q)LoRA fine-tuning, Delta/Flag multi-head training  
→ FastAPI server + Hugging Face Spaces deployment (automatic Dockerfile build)  
→ NPC trust, relationship, and quest event-based conversation, RAG-based context search  
🔗 [HF Spaces](https://huggingface.co/spaces/m97j/PersonaChatEngine_hf-serve) · [Model Card](https://huggingface.co/m97j/npc_LoRA-fps)

- [🗣 Pragmatic LLM Search](https://huggingface.co/spaces/m97j/PersonaChatEngine_hf-serve) <🔴[🗣🖇]🟢>](https://github.com/m97j/pragmatic-llm-search)  
Open-source LLM-based search + summary chatbot (7B-10B model)  
→ RAG architecture design, QLoRA/DPO tuning, search + reranking + context configuration  
→ Hugging Face Space SaaS prototype deployment (Triton, Docker)  

### 🔷 Game Development
- [🕹 FPS Game <🔷[🕹🎯🗺🎮]⚫🟢>](https://github.com/m97j/fpsgame)  
A Unity-based First-Person Shooter (FPS) project (Beta Release)  
→ Enemy AI design extended with **FSM → Behavior Tree → ML-Agents PPO** and reinforcement learning application  
→ Node.js + MongoDB-based client-server architecture, multi-map play, and weapon system implementation  
→ Collaboration and scalability considered with GitFlow strategy and modular directory structure  
🔗 [Demo Video](https://youtu.be/98fkWuGhLA0) · [Release](https://github.com/m97j/FpsGame/releases/tag/v0.2-beta)

### 🟠 Web & Cloud
- [🖥️ Kakao Login Web Service <🟠⚫>](https://github.com/m97j/WSD4_kakao_login_auth) — React + Node.js + MongoDB
- ~~[☁️ Image Conversion Service <🟠⚫🟢🔴[📷]>](https://github.com/m97j/cloudapp) — Flask + AWS EC2~~[To be added]

### 🎓 Academic Projects
- [📘 Artificial Intelligence <🔴>](https://github.com/m97j/pacman-ai) — Implementing exploration/strategy algorithms in the Pacman game + implementing DQN extensions
- [📘 Machine Learning <🔴>](https://github.com/m97j/ml-assignments) — Implementing classical ML algorithms
- [📘 Data Mining <🔴⚫>](https://github.com/m97j/dm-assignments) — PageRank, recommendation systems, Kaggle practice
- [📘 Natural Language Processing <🔴[🗣]>](https://github.com/m97j/nlp-assignments) — Tokenizer, Korean automata, In-school Kaggle competition participation

---

## 📩 Contact
- Email: **mmnkjiae@gmail.com**
- GitHub: [github.com/m97j](https://github.com/m97j)