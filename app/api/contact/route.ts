import { Resend } from "resend";
import { NextResponse } from "next/server";

const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
const from = process.env.RESEND_FROM_EMAIL;
const resendApiKey = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  if (!resendApiKey || !recipient || !from) {
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
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

    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from,
      to: [recipient],
      replyTo: email,
      subject: `Portfolio inquiry from ${email}`,
      text: `From: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend contact form error:", error);
      return NextResponse.json(
        { error: "Unable to send your message right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Please check your message and try again." },
      { status: 400 },
    );
  }
}
