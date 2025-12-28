// app/api/join/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimiter";
import logger from "@/lib/logger";
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
    logger.info(`[JOIN_SUBMISSION] Request received from IP: ${ip}`);

    if (!rateLimit(ip, tier)) {
      logger.warn(`[RATE_LIMIT_BLOCKED] IP: ${ip} exceeded tier '${tier}'`);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();
    const phone = (body?.phone || "").trim();
    const location = (body?.location || "").trim();
    const message = (body?.message || "").trim();
    const localeRaw = (body?.locale || "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const locale = normalizeLocale(localeRaw || "en");
    const joinDict = (await getDictionary(locale, "join")) as JoinDictionary;
    const emailDict = joinDict.email ?? {};

    const withName = (t?: string, fb?: string) =>
      (t ?? fb ?? "").replace("{name}", name);

    const userSubject =
      emailDict.userSubject ??
      "Nouvo Ayiti 2075 — Thank you for joining";

    const userHtml = `
      <p>${withName(emailDict.userGreeting, `Dear ${name},`)}</p>
      <p>${
        emailDict.userIntro ??
        "Thank you for standing with Nouvo Ayiti 2075."
      }</p>
      <p><strong>${
        emailDict.userSummaryTitle ??
        "Here is a copy of the information you shared:"
      }</strong></p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ""}
        ${location ? `<li><strong>Location:</strong> ${location}</li>` : ""}
        <li><strong>Message:</strong> ${message || "—"}</li>
      </ul>
      <p>${emailDict.userOutro ?? ""}</p>
      <p>${(emailDict.userSignature ?? "")
        .replace(/\n/g, "<br/>")}</p>
    `;

    const adminSubject =
      emailDict.adminSubject ??
      "New join form submission – Nouvo Ayiti 2075";

    const adminHtml = `
      <p>${emailDict.adminIntro ?? "A new join submission arrived:"}</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ""}
        ${location ? `<li><strong>Location:</strong> ${location}</li>` : ""}
        <li><strong>Message:</strong> ${message || "—"}</li>
      </ul>
      <p>${emailDict.adminFooter ?? ""}</p>
    `;

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      logger.warn(`[JOIN_WARNING] RESEND_API_KEY missing`);
      return NextResponse.json(
        { success: true, message: "Submission stored. Email disabled." },
        { status: 200 }
      );
    }

    const resend = new Resend(key);

    try {
      await resend.emails.send({
        from: "Ayiti 2075 <info@nouvoayiti2075.com>",
        to: [email],
        subject: userSubject,
        html: userHtml,
      });

      logger.info(`[JOIN_EMAIL] User email sent → ${email}`);
    } catch (e) {
      logger.error(`[JOIN_EMAIL_ERROR] Failed user email`, e);
    }

    try {
      await resend.emails.send({
        from: "Ayiti Bot <info@nouvoayiti2075.com>",
        to: ADMIN_EMAILS,
        subject: adminSubject,
        html: adminHtml,
      });

      logger.info(`[JOIN_EMAIL] Admin notification sent`);
    } catch (e) {
      logger.error(`[JOIN_EMAIL_ERROR] Failed admin email`, e);
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (e) {
    logger.error(`[JOIN_ERROR] Fatal join handler error`, e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
