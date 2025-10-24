// frontend/app/contact/page.tsx
"use client";

import { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha"; // 🔒 현재는 사용 안 함

export default function ContactPage() {
  const [status, setStatus] = useState("");
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null); // 🔒 현재는 사용 안 함

  // 🔒 기존 SendGrid API 호출 로직 (주석 처리)
  /*
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("전송 중...");

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        token: captchaToken,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatus(" 전송 완료! 빠른 시일 내에 답변드리겠습니다.");
      e.currentTarget.reset();
    } else {
      setStatus(" 전송 실패. 다시 시도해주세요.");
    }
  }
  */

  //  새로운 mailto 우회 로직
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = encodeURIComponent(`[Portfolio Contact] ${name}님의 문의`);
    const body = encodeURIComponent(`보낸 사람: ${name} <${email}>\n\n메시지:\n${message}`);

    // mailto 링크 실행 → OS 기본 메일 클라이언트 열림
    window.location.href = `mailto:mmnkjiae@gmail.com?subject=${subject}&body=${body}`;

    setStatus("메일 클라이언트가 열렸습니다. 메일을 확인 후 전송해주세요.");
  }

  return (
    <section className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">✉️ Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="이름" className="input input-bordered w-full" required />
        <input type="email" name="email" placeholder="이메일" className="input input-bordered w-full" required />
        <textarea name="message" placeholder="메시지" className="textarea textarea-bordered w-full" rows={5} required />

        {/* 🔒 기존 reCAPTCHA (현재는 사용 안 함)
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={(token) => setCaptchaToken(token)}
        />
        */}

        <button type="submit" className="btn btn-primary w-full">메일 작성하기</button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </section>
  );
}
