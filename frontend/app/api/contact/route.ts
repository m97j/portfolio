// // frontend/app/api/contact/route.ts  [🔒 현재는 사용 안 함]
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { name, email, message, token } = await req.json();

//     if (!name || !email || !message || !token) {
//       return NextResponse.json({ error: "필수 입력값 누락" }, { status: 400 });
//     }

//     // reCAPTCHA 검증
//     const captchaRes = await fetch(
//       `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
//       { method: "POST" }
//     );
//     const captchaData = await captchaRes.json();
//     if (!captchaData.success) {
//       return NextResponse.json({ error: "reCAPTCHA 검증 실패" }, { status: 400 });
//     }

//     // SendGrid 메일 발송
//     const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         personalizations: [
//           {
//             to: [{ email: "yourname@example.com" }],
//             subject: `[Portfolio Contact] ${name}님의 메시지`,
//           },
//         ],
//         from: { email: "noreply@yourdomain.com" },
//         reply_to: { email },
//         content: [
//           {
//             type: "text/plain",
//             value: `보낸 사람: ${name} <${email}>\n\n메시지:\n${message}`,
//           },
//         ],
//       }),
//     });

//     if (!res.ok) {
//       throw new Error("메일 발송 실패");
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "서버 오류" }, { status: 500 });
//   }
// }
