import { Resend } from "resend";
import { NextResponse } from "next/server";

// Only RESEND_API_KEY is required from env.
// to/from are hardcoded so the route works on Vercel even if optional
// env vars are missing. Resend free tier requires sending to the
// account owner email when no custom domain is verified.
const RECIPIENT = "almendares.johnmarcus@gmail.com";
const FROM      = "Portfolio Contact <onboarding@resend.dev>";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Mail service is not configured." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const email   = typeof body.email   === "string" ? body.email.trim()   : "";
  const phone   = typeof body.phone   === "string" ? body.phone.trim()   : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!email || !message) {
    return NextResponse.json(
      { error: "Please provide your email and a message." },
      { status: 400 },
    );
  }

  if (email.length > 320 || phone.length > 50 || message.length > 5000) {
    return NextResponse.json(
      { error: "One or more fields are too long." },
      { status: 400 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from:    FROM,
      to:      [RECIPIENT],
      replyTo: email,
      subject: `Portfolio inquiry from ${email}`,
      text:    `From:    ${email}\nPhone:   ${phone || "Not provided"}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: `Mail delivery failed: ${error.message}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Contact route exception:", msg);
    return NextResponse.json(
      { error: `Server error: ${msg}` },
      { status: 500 },
    );
  }
}