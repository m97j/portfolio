# 🧠 Tech Portfolio

👉 Full portfolio site: [minjae-portfolio.vercel.app](https://minjae-portfolio.vercel.app)

---

## 📦 Repository Purpose
This repository contains the **portfolio site code** and deployment configuration:

- `frontend/` — Next.js client (deployed on Vercel, SSR-based dynamic pages)  
- `backend/` — Node.js API server (deployed on Hugging Face Spaces)  
- `infra/` — Azure Bicep modules + GitHub Actions workflows (initial cloud deployment history)  
- `guides/` — Project tag guide and documentation  
- `docs/` — Fallback portfolio documents (English/Korean)

---

## 🏗️ Architecture & Deployment
- **Current setup**:  
  - Frontend → Vercel (Next.js SSR, dynamic rendering with Markdown parsing)  
  - Backend → Hugging Face Spaces (Node.js, CRUD + auth + admin dashboard)  
  - Database → Supabase (PostgreSQL, persistent storage)  

- **Flow**:  
  Client UI → Backend API → Database  
  - CRUD operations are performed by the backend, while the frontend provides UI/UX.  
  - Admin & edit pages, authentication, and category-based rendering are handled server-side.  

- **History**:  
  Initially deployed on **Azure (frontend, backend, PostgreSQL DB)** using Bicep modules and GitHub Actions.  
  Due to cost considerations, migrated to free platforms (Vercel, HF Spaces, Supabase) for 24/365 stable hosting.  
  Azure deployment scripts remain in `infra/` and `.github/workflows/` as archived references.

---

## 📖 Portfolio Docs (Fallback)
In case the portfolio site is unavailable, you can view the full portfolio documents here:

- [English Version](docs/en/README.md)  
- [Korean Version](docs/ko/README.md)  

---

## 🧰 Tech Stack
- **Languages**: C++, C#, Python, JavaScript, Java...
- **AI / ML**: TensorFlow, PyTorch, Colab, HuggingFace, scikit-learn...     
- **Web**: React, Node.js, Next.js, Flask...  
- **Game Engines**: Unity, Unreal Engine (learning) 
- **Infra / Cloud**: Git, AWS, Azure, Supabase, MongoDB, MySQL...  

---

## 📩 Contact
- Email: **mmnkjiae@gmail.com**  
- GitHub: [github.com/m97j](https://github.com/m97j)
