// app/api/join/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimiter";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { normalizeLocale } from "@/lib/i18n/settings";
import type { JoinDictionary } from "@/lib/i18n/types";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = ["info@nouvoayiti2075.com", "nouvoayiti2075@gmail.com"];

function getClientIP(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const tier = "public";

  try {
    console.log(`[JOIN_SUBMISSION] Request received from IP: ${ip}`);

    // 1) Rate limiting
    if (!rateLimit(ip, tier)) {
      console.warn(`[RATE_LIMIT_BLOCKED] IP: ${ip} exceeded tier '${tier}'`);
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 2) Parse body
    const body = await req.json().catch(() => null as any);

    const name = (body?.name ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim();
    const phone = (body?.phone ?? "").toString().trim();
    const location = (body?.location ?? "").toString().trim();
    const message = (body?.message ?? "").toString().trim();
    const localeRaw = (body?.locale ?? "").toString().trim();

    // Honeypot anti-spam field (hidden in the form)
    const honeypot = (body?.honeypot ?? "").toString().trim();
    if (honeypot) {
      console.warn(
        `[JOIN_SPAM] Honeypot triggered. IP: ${ip}, email: ${email || "N/A"}`
      );
      // Pretend success so bots learn nothing
      return NextResponse.json(
        { success: true, message: "Submission received." },
        { status: 200 }
      );
    }

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const locale = normalizeLocale(localeRaw || "en");

    // 3) Localized email copy from join dictionary
    const joinDict = (await getDictionary(locale, "join")) as JoinDictionary;
    const emailDict = joinDict.email ?? {};

    const withName = (t?: string, fb?: string) =>
      (t ?? fb ?? "").replace("{name}", name);

    // ----- User confirmation email -----
    const userSubject =
      emailDict.userSubject ??
      "Nouvo Ayiti 2075 — Thank you for joining";

    const userGreeting = withName(emailDict.userGreeting, `Dear ${name},`);

    const userIntro =
      emailDict.userIntro ??
      "Thank you for standing with Nouvo Ayiti 2075. Your decision to join the movement helps us restore dignity, rebuild hope, and serve communities across Haiti.";

    const userSummaryTitle =
      emailDict.userSummaryTitle ??
      "Here is a copy of the information you shared:";

    const userOutro =
      emailDict.userOutro ??
      "Our team will keep you informed about projects, events, and ways to support the vision for a renewed Haiti.";

    const userSignature =
      emailDict.userSignature ?? "With gratitude,\nThe Nouvo Ayiti 2075 Team";

    const userHtml = `
      <p>${userGreeting}</p>
      <p>${userIntro}</p>
      <p><strong>${userSummaryTitle}</strong></p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ""}
        ${location ? `<li><strong>Location:</strong> ${location}</li>` : ""}
        <li><strong>Message:</strong> ${message || "—"}</li>
      </ul>
      <p>${userOutro}</p>
      <p>${userSignature.replace(/\n/g, "<br />")}</p>
    `;

    // ----- Admin notification email -----
    const adminSubject =
      emailDict.adminSubject ??
      "New join form submission – Nouvo Ayiti 2075";

    const adminIntro =
      emailDict.adminIntro ??
      "A new person has just completed the join form. Details:";

    const adminFooter =
      emailDict.adminFooter ??
      "Please review this submission and follow up as appropriate.";

    const adminHtml = `
      <p>${adminIntro}</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ""}
        ${location ? `<li><strong>Location:</strong> ${location}</li>` : ""}
        <li><strong>Message:</strong> ${message || "—"}</li>
      </ul>
      <p>${adminFooter}</p>
    `;

    // 4) Read + validate API key *inside* the handler
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(
        "[JOIN] RESEND_API_KEY is not set. Skipping email send but returning success."
      );
      return NextResponse.json(
        {
          success: true,
          message:
            "Nou resevwa enskripsyon ou. (Imèl yo tanporèman dezaktive sou anviwònman sa a.)",
        },
        { status: 200 }
      );
    }

    const resend = new Resend(apiKey);

    // 5) Send emails
    try {
      await resend.emails.send({
        from: "Ayiti 2075 <info@nouvoayiti2075.com>",
        to: [email],
        subject: userSubject,
        html: userHtml,
      });

      console.log(
        `[JOIN_EMAIL] User email sent → ${email} (IP: ${ip}, locale: ${locale})`
      );
    } catch (e) {
      console.error("[JOIN_EMAIL_ERROR] Failed user email", e);
    }

    try {
      await resend.emails.send({
        from: "Ayiti Bot <info@nouvoayiti2075.com>",
        to: ADMIN_EMAILS,
        subject: adminSubject,
        html: adminHtml,
      });

      console.log(`[JOIN_EMAIL] Admin notification sent for: ${email}`);
    } catch (e) {
      console.error("[JOIN_EMAIL_ERROR] Failed admin email", e);
    }

    // 6) Final response
    return NextResponse.json(
      { success: true, message: "Submission received and emails processed." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[JOIN_ERROR] Fatal join handler error", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
